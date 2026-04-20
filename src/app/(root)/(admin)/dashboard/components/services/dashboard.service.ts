import { api } from '@/lib/axios'
import { Post } from '@/types/post'

export interface DashboardStats {
  totalPosts: number
  totalCategories: number
  totalViews: number
  totalUsers: number
}

export interface DashboardResponse {
  stats: DashboardStats
  recentPosts: Post[]
  views: { date: string; count: number }[]
}

export const dashboardService = {
  async getDashboard(): Promise<DashboardResponse> {
    const res = await api.get('/api/admin/dashboard')
    return res.data.data
  },
}
