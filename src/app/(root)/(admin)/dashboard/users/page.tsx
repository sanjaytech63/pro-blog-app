export const dynamic = 'force-dynamic'

import AdminUsersClient from './client'

interface PageProps {
  searchParams: {
    page?: string
    search?: string
    includeDeleted?: string
  }
}

export default function AdminUsersPage({ searchParams }: PageProps) {
  return (
    <AdminUsersClient
      initialPage={Number(searchParams.page) || 1}
      initialSearch={searchParams.search || ''}
      includeDeleted={searchParams.includeDeleted === 'true'}
    />
  )
}
