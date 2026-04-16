'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import { usePosts } from '@/hooks/admin/use-posts'
import { Pagination } from '@/components/common/pagination'

import PostFilters from './components/post-filters'
import PostFormDialog from './components/post-form-dialog'
import PostDeleteDialog from './components/post-delete-dialog'
import PostTable from './components/post-table'

import { PostEntity } from '@/types/post'

type Filters = {
  search?: string
  status?: 'DRAFT' | 'PUBLISHED'
  category?: string
}

type Props = {
  searchParams: {
    search?: string
    status?: 'DRAFT' | 'PUBLISHED'
    category?: string
    page?: string
  }
}

export default function AdminPostsClient({ searchParams }: Props) {
  const router = useRouter()

  // ✅ Initialize from server params (NO useSearchParams)
  const [filters, setFilters] = useState<Filters>(() => ({
    search: searchParams.search || undefined,
    status: searchParams.status || undefined,
    category: searchParams.category || undefined,
  }))

  const [page, setPage] = useState<number>(() => Number(searchParams.page || 1))

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editPost, setEditPost] = useState<PostEntity | null>(null)
  const [open, setOpen] = useState(false)

  // ✅ Sync state → URL
  useEffect(() => {
    const query = new URLSearchParams()

    if (filters.search) query.set('search', filters.search)
    if (filters.status) query.set('status', filters.status)
    if (filters.category) query.set('category', filters.category)
    if (page > 1) query.set('page', String(page))

    router.replace(`?${query.toString()}`)
  }, [filters, page, router])

  // ✅ Filter handler (optimized)
  const handleFilterChange = useCallback((value: Filters) => {
    setPage(1)

    setFilters((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(value)) return prev
      return value
    })
  }, [])

  // ✅ Data fetching
  const { data, isLoading } = usePosts({
    page,
    limit: 5,
    ...filters,
  })

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>

        <div className="flex gap-3">
          <PostFilters onChange={handleFilterChange} />

          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>

      {/* Table */}
      <PostTable
        data={data?.data?.data ?? []}
        loading={isLoading}
        onEditClick={setEditPost}
        onDeleteClick={setDeleteId}
      />

      {/* Pagination */}
      <Pagination
        page={data?.data?.meta?.page ?? 1}
        total={data?.data?.meta?.total ?? 0}
        limit={data?.data?.meta?.limit ?? 10}
        onPageChange={setPage}
      />

      {/* Create/Edit Dialog */}
      <PostFormDialog
        open={open || !!editPost}
        post={editPost}
        onClose={() => {
          setOpen(false)
          setEditPost(null)
        }}
      />

      {/* Delete Dialog */}
      <PostDeleteDialog
        postId={deleteId}
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
      />
    </div>
  )
}
