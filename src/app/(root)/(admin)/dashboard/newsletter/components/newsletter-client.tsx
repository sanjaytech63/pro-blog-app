'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { NewsletterTable } from './newsletter-table'
import { Pagination } from '@/components/common/pagination'
import { newsletterService } from '@/services/client/newsletter.client.service'
import { toast } from 'sonner'
import { useAdminNewsletter } from '@/hooks/admin/use-admin-newsletter'

interface Props {
  initialPage: number
  initialSearch: string
}

export default function NewsletterAdminClient({
  initialPage,
  initialSearch,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const [page, setPage] = useState(initialPage)
  const [search, setSearch] = useState(initialSearch)
  const debouncedSearch = useDebouncedValue(search)

  const searchParamsString = params.toString()

  useEffect(() => {
    const qp = new URLSearchParams(searchParamsString)

    qp.set('page', String(page))

    if (debouncedSearch) {
      qp.set('search', debouncedSearch)
    } else {
      qp.delete('search')
    }

    router.replace(`${pathname}?${qp.toString()}`, {
      scroll: false,
    })
  }, [page, debouncedSearch, searchParamsString, pathname, router])

  const { data, isLoading, isFetching, refetch } = useAdminNewsletter({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
  })

  async function handleDelete(id: string) {
    const res = await newsletterService.deleteSubscriber(id)
    toast.success(res.message)
    refetch()
  }

  async function handleUnsubscribe(email: string) {
    const res = await newsletterService.unsubscribe(email)
    toast.success(res.message)
    refetch()
  }

  return (
    <div className="space-y-6">
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
        placeholder="Search subscribers…"
        className="max-w-sm"
      />

      <NewsletterTable
        data={data?.data ?? []}
        loading={isLoading || isFetching}
        onDelete={handleDelete}
        onUnsubscribe={handleUnsubscribe}
      />

      {data?.meta && (
        <Pagination
          page={data.meta.page}
          total={data.meta.total}
          limit={data.meta.limit}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
