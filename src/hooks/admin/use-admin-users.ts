'use client'

import { useQuery } from '@tanstack/react-query'
import { adminUserService } from '@/services/client/admin-user.service'
import { PaginatedUsers } from '@/types/pagination'

interface ListUsersQuery {
  page: number
  limit: number
  search?: string
  includeDeleted?: boolean
}

export function useAdminUsers(query: ListUsersQuery) {
  return useQuery<PaginatedUsers>({
    queryKey: ['admin-users', query],
    queryFn: () => adminUserService.list(query),
    placeholderData: (previousData) => previousData,
  })
}
