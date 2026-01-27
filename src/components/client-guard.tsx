'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { FullPageLoader } from './ui/full-page-loader'

type Props = {
  children: React.ReactNode
  role?: 'admin' | 'user'
}

export function ClientGuard({ children, role }: Props) {
  const { isAuthenticated, isVerified, isAdmin, isLoading } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.replace('/login')
      return
    }

    if (!isVerified) {
      router.replace('/verify-otp')
      return
    }

    if (role === 'admin' && !isAdmin) {
      router.replace('/')
    }
  }, [isAuthenticated, isVerified, isAdmin, isLoading, role, router])

  if (isLoading || !isAuthenticated) {
    return <FullPageLoader />
  }

  return <>{children}</>
}
