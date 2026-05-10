'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { FullPageLoader } from './ui/full-page-loader'

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password']

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoading, user } = useAuth()

  const isPublic = PUBLIC_ROUTES.includes(pathname)

  useEffect(() => {
    if (!isPublic && !isLoading && !user) {
      router.replace('/login')
    }
  }, [isPublic, isLoading, user, router])

  if (!isPublic && (isLoading || user === undefined)) {
    return <FullPageLoader />
  }

  if (!isPublic && !user) {
    return null
  }

  return <>{children}</>
}
