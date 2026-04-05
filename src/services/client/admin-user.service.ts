import { api } from '@/lib/axios'
import { ApiResponse } from '@/types/api'
import { AuthUser } from '@/types/auth'
import { PaginatedUsers } from '@/types/pagination'

export interface ListUsersQuery {
  page: number
  limit: number
  search?: string
  isDeleted?: boolean
}

export const adminUserService = {
  async list(query: ListUsersQuery): Promise<PaginatedUsers> {
    const res = await api.get('/api/users', { params: query })

    return res.data?.data
  },

  async restore(userId: string): Promise<ApiResponse<AuthUser>> {
    const res = await api.patch(`/api/users/${userId}/restore`)
    return res.data
  },

  async permanentDelete(userId: string): Promise<ApiResponse<null>> {
    const res = await api.delete(`/api/users/${userId}/permanent`)
    return res.data
  },
}
