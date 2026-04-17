import { BlogHero } from '@/components/blog/blog-hero'
import BlogContent from '@/components/blog/blog-content'
import { getPosts, getCategories } from '@/services/server/post.api'
import { CategoryResponse } from '@/types/post'

interface Props {
  searchParams: Promise<{
    category?: string
    search?: string
    page?: string
    limit?: string
  }>
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams

  const page = Number(params?.page || 1)
  const limit = Number(params?.limit || 10)

  const [postsRes, categoriesRes] = await Promise.all([
    getPosts({
      status: 'PUBLISHED',
      page: page.toString(),
      limit: limit.toString(),
      ...(params?.category && { category: params.category }),
      ...(params?.search && { search: params.search }),
    }),
    getCategories(),
  ])

  const posts = postsRes?.data ?? []
  const meta = postsRes?.meta ?? {}

  const categories =
    categoriesRes?.categories?.map((c: CategoryResponse) => ({
      id: c.slug,
      name: c.name,
      slug: c.slug,
      count: c.count,
    })) ?? []

  const activeCategory = params?.category || undefined

  return (
    <>
      <BlogHero />
      <BlogContent
        posts={posts}
        meta={meta}
        categories={categories}
        recentPosts={posts.slice(0, 5)}
        activeCategory={activeCategory}
      />
    </>
  )
}
