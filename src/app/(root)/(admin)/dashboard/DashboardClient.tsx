'use client'

import { ClientGuard } from '@/components/client-guard'

export default function DashboardClient() {
  return (
    <ClientGuard>
      <h1>Dashboard</h1>
    </ClientGuard>
  )
}
