'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { useAdminUsers } from '@/hooks/admin/use-admin-users'
import { UsersTable } from './components/users-table'
import { Pagination } from '@/components/common/pagination'

interface Props {
  initialPage: number
  initialSearch: string
  includeDeleted: boolean
}

export default function AdminUsersClient({
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

  const { data, isLoading, isFetching } = useAdminUsers({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    includeDeleted: true,
  })

  return (
    <div className="space-y-6">
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
        placeholder="Search users…"
        className="max-w-sm"
      />

      <UsersTable users={data?.data ?? []} loading={isLoading || isFetching} />

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
