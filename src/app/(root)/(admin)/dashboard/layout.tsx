'use client'

import { ClientGuard } from '@/components/client-guard'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientGuard>{children}</ClientGuard>
}
