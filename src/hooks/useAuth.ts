'use client'

import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services/client/auth.service'
import { AuthUser } from '@/types/auth'

export function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: authService.me,
    retry: false,
    staleTime: 5 * 60 * 1000,
  })

  const user: AuthUser | null = data?.data?.data ?? null

  return {
    user,
    isAuthenticated: !!user,
    isVerified: !!user?.isVerified,
    role: user?.role ?? 'user',
    isAdmin: user?.role === 'admin',
    isLoading,
    isError,
  }
}
