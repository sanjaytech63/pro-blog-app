'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services/client/auth.service'
import { useAuthStore } from '@/store/auth.store'

export function AuthInitializer() {
  const setUser = useAuthStore((s) => s.setUser)

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: authService.me,
    staleTime: Infinity,
    retry: false,
  })

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data, setUser])

  return null
}
