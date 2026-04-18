'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import Container from '../container'
import { PostGrid } from './post-grid'
import { BlogSidebar } from './blog-sidebar'
import { Pagination } from '@/components/common/pagination'
import { Post } from '@/types/post'
import { EmptyState } from '../common/empty-state'

interface Category {
  id: string
  name: string
  slug: string
  count: string
}

interface Props {
  posts: Post[]
  categories: Category[]
  recentPosts: Post[]
  meta: {
    page: number
    total: number
    limit: number
  }
}

export default function BlogContentClient({
  posts,
  categories,
  recentPosts,
  meta,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())

      const current = params.get('page') || '1'
      if (current === String(page)) return

      if (page > 1) {
        params.set('page', String(page))
      } else {
        params.delete('page')
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  const isEmpty = posts.length === 0

  return (
    <Container className="flex h-full flex-col pt-10">
      <div className="pb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          📚 Blog
        </h1>
        <p className="text-muted-foreground mt-2 max-w-xl text-sm">
          Insights, tutorials, and real-world engineering practices.
        </p>
      </div>

      <div className="grid flex-1 gap-10 lg:grid-cols-[4fr_1fr]">
        <div className="mt-4 flex flex-col space-y-10">
          {isEmpty ? <EmptyState /> : <PostGrid posts={posts} />}
        </div>

        <aside className="sticky top-25 h-fit space-y-6 rounded-2xl border p-4">
          <BlogSidebar categories={categories} recentPosts={recentPosts} />
        </aside>
      </div>

      <div className="mt-12 flex justify-center py-10">
        <Pagination
          page={meta.page}
          total={meta.total}
          limit={meta.limit}
          onPageChange={handlePageChange}
        />
      </div>
    </Container>
  )
}
