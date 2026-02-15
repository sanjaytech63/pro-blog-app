import NewsletterAdminClient from './components/newsletter-client'

interface Props {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}

export default async function NewsletterAdminPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams

  const initialPage = Number(resolvedSearchParams?.page) || 1
  const initialSearch = resolvedSearchParams?.search || ''

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Newsletter Subscribers</h1>

      <NewsletterAdminClient
        initialPage={initialPage}
        initialSearch={initialSearch}
      />
    </div>
  )
}
