import { Post } from '@/models/post.model'
import { User } from '@/models/user.model'
import { cache } from '@/lib/cache'
import { DashboardResponse } from '@/types/dashboard.types'

/* ------------------ TYPES ------------------ */
type ViewsAggregation = {
  _id: string
  count: number
}

/* ------------------ UTILS ------------------ */

// Fill last N days even if no data
const fillMissingDates = (data: ViewsAggregation[], days = 7) => {
  const result: { date: string; count: number }[] = []

  const map = new Map(data.map((d) => [d._id, d.count]))

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    const key = date.toISOString().slice(0, 10)

    result.push({
      date: key,
      count: map.get(key) || 0,
    })
  }

  return result
}

// Sum helper
const sumCounts = (data: ViewsAggregation[]) =>
  data.reduce((acc, curr) => acc + (curr.count || 0), 0)

class DashboardService {
  async getDashboard(): Promise<DashboardResponse> {
    const cacheKey = 'dashboard:admin:v2'

    const cached = await cache.get<DashboardResponse>(cacheKey)
    if (cached) return cached

    /* ------------------ DATE RANGES ------------------ */
    const now = new Date()

    const last7Days = new Date()
    last7Days.setDate(now.getDate() - 7)

    const prev7Days = new Date()
    prev7Days.setDate(now.getDate() - 14)

    /* ------------------ PARALLEL QUERIES ------------------ */
    const [
      totalPosts,
      totalUsers,
      recentPosts,
      viewsCurrent,
      viewsPrevious,
      categoriesCount,
    ] = await Promise.all([
      /* TOTALS */
      Post.countDocuments({ isDeleted: false }),
      User.countDocuments({ isDeleted: false }),

      /* RECENT POSTS */
      Post.find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title createdAt status coverImage slug')
        .lean(),

      /* CURRENT 7 DAYS */
      Post.aggregate<ViewsAggregation>([
        {
          $match: {
            isDeleted: false,
            createdAt: { $gte: last7Days },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt',
              },
            },
            count: {
              $sum: { $ifNull: ['$views', 1] }, // fallback
            },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      /* PREVIOUS 7 DAYS */
      Post.aggregate<ViewsAggregation>([
        {
          $match: {
            isDeleted: false,
            createdAt: {
              $gte: prev7Days,
              $lt: last7Days,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt',
              },
            },
            count: {
              $sum: { $ifNull: ['$views', 1] },
            },
          },
        },
      ]),

      /* CATEGORIES */
      Post.distinct('category', { isDeleted: false }),
    ])

    /* ------------------ PROCESS DATA ------------------ */

    const views = fillMissingDates(viewsCurrent, 7)

    const totalViews = sumCounts(viewsCurrent)
    const prevViews = sumCounts(viewsPrevious)

    const growth =
      prevViews > 0 ? ((totalViews - prevViews) / prevViews) * 100 : 0

    /* ------------------ RESPONSE ------------------ */
    const result: DashboardResponse = {
      stats: {
        totalPosts,
        totalUsers,
        totalCategories: categoriesCount.length,
        totalViews,

        /* 🔥 NEW (for stats card) */
        prevTotalViews: prevViews,
        viewsGrowth: Number(growth.toFixed(1)),
      },

      recentPosts,

      views, // clean formatted
    }

    /* ------------------ CACHE ------------------ */
    await cache.set(cacheKey, result, 60)

    return result
  }
}

export const dashboardService = new DashboardService()
