'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { authService } from '@/services/client/auth.service'
import { useAuthStore } from '@/store/auth.store'

export function useLogout() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const logout = async () => {
    if (isLoggingOut) return

    try {
      setIsLoggingOut(true)
      const res = await authService.logout()
      useAuthStore.getState().logout()
      toast.success(res.message || 'Logged out successfully')
      router.replace('/login')
    } catch {
      toast.error('Logout failed')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return {
    logout,
    isLoggingOut,
  }
}
