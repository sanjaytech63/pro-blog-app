import AdminUsersClient from './client'

interface PageProps {
  searchParams: {
    page?: string
    search?: string
    includeDeleted?: string
  }
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <AdminUsersClient
      initialPage={Number(params.page) || 1}
      initialSearch={params.search || ''}
      includeDeleted={params.includeDeleted === 'true'}
    />
  )
}
