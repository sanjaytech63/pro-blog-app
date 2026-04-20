import { cache } from '@/lib/cache'
import { Newsletter } from '@/models/newsletter.model'
import ApiError from '@/utils/ApiError'
interface ListUsersQuery {
  page?: number
  limit?: number
  search?: string
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>
}

class NewsletterService {
  /* ---------- SUBSCRIBE ---------- */
  async subscribe(email: string) {
    const normalizedEmail = email.trim().toLowerCase()

    const existing = await Newsletter.findOne({
      email: normalizedEmail,
    })

    if (existing) {
      if (existing.status === 'active') {
        throw new ApiError(400, 'Already subscribed')
      }

      existing.status = 'active'
      await existing.save()

      return {
        message: 'Resubscribed successfully',
      }
    }

    await Newsletter.create({
      email: normalizedEmail,
      status: 'active',
    })

    return {
      message: 'Subscribed successfully',
    }
  }

  /* ---------- UNSUBSCRIBE ---------- */
  async unsubscribe(email: string) {
    const normalizedEmail = email.trim().toLowerCase()

    const subscriber = await Newsletter.findOne({
      email: normalizedEmail,
    })

    if (!subscriber) {
      // silent fail for privacy (like forgotPassword)
      return { email: normalizedEmail }
    }

    if (subscriber.status === 'unsubscribed') {
      throw new ApiError(400, 'Already unsubscribed')
    }

    subscriber.status = 'unsubscribed'
    await subscriber.save()

    return { message: 'Unsubscribed successfully' }
  }

  /* ---------- ADMIN: GET ALL ---------- */
  async getAll({
    page = 1,
    limit = 10,
    search,
  }: {
    page: number
    limit: number
    search?: string
  }) {
    const cacheKey = `newsletter:newsletter-get-admin}`

    const cached = await cache.get(cacheKey)
    if (cached) return cached

    if (page < 1 || limit < 1) {
      throw new ApiError(400, 'Invalid pagination parameters')
    }

    const skip = (page - 1) * limit

    const filter: ListUsersQuery = {}

    if (search) {
      filter.$or = [{ email: { $regex: search, $options: 'i' } }]
    }

    const [data, total] = await Promise.all([
      Newsletter.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Newsletter.countDocuments(filter),
    ])

    const result = {
      data,
      meta: {
        total,
        page,
        limit,
      },
    }

    await cache.set(cacheKey, result, 60)

    return result
  }

  /* ---------- ADMIN: DELETE ---------- */
  async deleteSubscriber(id: string) {
    const subscriber = await Newsletter.findById(id)

    if (!subscriber) {
      throw new ApiError(404, 'Subscriber not found')
    }

    await subscriber.deleteOne()

    return { message: 'Subscriber deleted successfully' }
  }
}

export const newsletterService = new NewsletterService()
