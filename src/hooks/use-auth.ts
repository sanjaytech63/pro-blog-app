'use client'

import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services/client/auth.service'
import { AuthUser } from '@/types/auth'

export function useAuth() {
  const { data: user, isLoading } = useQuery<AuthUser | null>({
    queryKey: ['me'],
    queryFn: authService.me,
    retry: true,
    staleTime: 5 * 60 * 1000,
  })

  return {
    user,
    isAuthenticated: !!user,
    isVerified: !!user?.isVerified,
    role: user?.role ?? 'user',
    isAdmin: user?.role === 'admin',
    isLoading: isLoading,
  }
}
