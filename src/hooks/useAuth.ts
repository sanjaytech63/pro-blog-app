'use client'

import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services/client/auth.service'
import { AuthUser } from '@/types/auth'

export function useAuth() {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery<AuthUser | null>({
    queryKey: ['me'],
    queryFn: authService.me,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  })

  return {
    user,
    isAuthenticated: !!user,
    isVerified: !!user?.isVerified,
    role: user?.role ?? 'user',
    isAdmin: user?.role === 'admin',
    isLoading: isLoading || isFetching,
  }
}
