import AdminPostsClient from './AdminPostsClient'

type SearchParams = {
  search?: string
  status?: 'DRAFT' | 'PUBLISHED'
  category?: string
  page?: string
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <AdminPostsClient searchParams={searchParams} />
}
