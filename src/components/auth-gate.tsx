'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { FullPageLoader } from './ui/full-page-loader'

export function AuthGate({ children }: { children: ReactNode }) {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <FullPageLoader />
  }

  return <>{children}</>
}
