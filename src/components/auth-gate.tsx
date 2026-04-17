'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { FullPageLoader } from './ui/full-page-loader'

export function AuthGate({ children }: { children: ReactNode }) {
  const { isLoading } = useAuth()

  return (
    <>
      {isLoading ? <FullPageLoader /> : null}
      {children}
    </>
  )
}
