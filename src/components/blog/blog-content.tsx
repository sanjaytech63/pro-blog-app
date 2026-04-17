'use client'

import { PostGrid } from './post-grid'
import { BlogSidebar } from './blog-sidebar'
import Container from '../container'
import { Post } from '@/types/post'
import { Pagination } from '@/components/common/pagination'
import { BlogSearch } from '../common/blog-search'
import { Suspense } from 'react'
import { CategoryFilter } from './category-filter'

interface Category {
  id: string
  name: string
  slug: string
}

interface BlogContentProps {
  posts: Post[]
  categories: Category[]
  recentPosts: Post[]
  meta: {
    page: number
    total: number
    limit: number
  }
}
import { useRouter, useSearchParams } from 'next/navigation'
export default function BlogContent({
  posts,
  categories,
  recentPosts,
  meta,
}: BlogContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (page > 1) {
      params.set('page', String(page))
    } else {
      params.delete('page')
    }

    router.push(`/blog?${params.toString()}`)
  }

  return (
    <Container className="px-4! py-16">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          📚 Blog List
        </div>

        <div className="flex items-center gap-4">
          <BlogSearch />

          <Suspense fallback={<div>Loading filters...</div>}>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Categories</h3>
              <CategoryFilter categories={categories} />
            </div>
          </Suspense>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[5fr_1fr]">
        {/* LEFT: BLOG LIST */}
        <div className="space-y-8">
          <PostGrid posts={posts} />

          <Pagination
            page={meta?.page || 1}
            total={meta?.total || 0}
            limit={meta?.limit || 8}
            onPageChange={handlePageChange}
          />
        </div>

        {/* RIGHT: SIDEBAR */}
        <div className="rounded-2xl border p-4">
          <BlogSidebar categories={categories} recentPosts={recentPosts} />
        </div>
      </div>
    </Container>
  )
}
