'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { usePosts } from '@/hooks/admin/use-posts'
import { PostEntity } from '@/types/post'
import { Pagination } from '@/components/common/pagination'
import PostFilters from './components/post-filters'
import PostFormDialog from './components/post-form-dialog'
import PostDeleteDialog from './components/post-delete-dialog'
import PostTable from './components/post-table'

export default function AdminPostsPage() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editPost, setEditPost] = useState<PostEntity | null>(null)
  const [open, setOpen] = useState(false)

  const { data, isLoading } = usePosts({
    page,
    limit: 10,
    ...filters,
  })

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>

        <div className="flex gap-3">
          <PostFilters
            onChange={(value) => {
              setPage(1)
              setFilters(value)
            }}
          />

          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <PostTable
          data={data?.data?.data ?? []}
          loading={isLoading}
          onEditClick={setEditPost}
          onDeleteClick={setDeleteId}
        />
      </div>

      <div className="border-t pt-4">
        <Pagination
          page={data?.data?.meta?.page ?? 1}
          total={data?.data?.meta?.total ?? 0}
          limit={data?.data?.meta?.limit ?? 10}
          onPageChange={setPage}
        />
      </div>

      <PostFormDialog
        open={open || !!editPost}
        post={editPost}
        onClose={() => {
          setOpen(false)
          setEditPost(null)
        }}
      />

      <PostDeleteDialog
        postId={deleteId}
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
      />
    </div>
  )
}
