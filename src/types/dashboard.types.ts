import { Post } from './post'

export interface DashboardStats {
  totalPosts: number
  totalUsers: number
  totalCategories: number
  totalViews: number
  prevTotalViews: number
  viewsGrowth: number
}

export interface DashboardResponse {
  stats: DashboardStats
  recentPosts: Post[]
  views: {
    date: string
    count: number
  }[]
}
