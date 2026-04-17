import { BlogHero } from '@/components/blog/blog-hero'
import BlogContent from '@/components/blog/blog-content'
import { Section } from '@/components/common/section'
import { getPosts } from '@/services/server/post.api'

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
  const limit = Number(params.limit || 4)

  const response = await getPosts({
    status: 'PUBLISHED',
    page: page.toString(),
    limit: limit.toString(),
    ...(params?.category && { category: params.category }),
    ...(params?.search && { search: params.search }),
  })

  const posts = response?.data ?? []
  const meta = response?.meta ?? {}
  const categories = response?.categories ?? []

  return (
    <Section>
      <BlogHero />

      <BlogContent
        posts={posts}
        meta={meta}
        categories={categories.map((c: string) => ({
          id: c,
          name: c,
          slug: c,
        }))}
        recentPosts={posts.slice(0, 5)}
      />
    </Section>
  )
}
