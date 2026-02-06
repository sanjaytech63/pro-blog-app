import { AuthUser } from '@/types/auth'

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedUsers {
  data: AuthUser[]
  meta: PaginationMeta
}
