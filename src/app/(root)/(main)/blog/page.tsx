import { BlogHero } from '@/components/blog/blog-hero'
import { BlogContent } from '@/components/blog/blog-content'
import { Section } from '@/components/common/section'

import { getPosts } from '@/services/server/post.service'

interface Props {
  searchParams: Promise<{
    category?: string
  }>
}

export const revalidate = 60

export default async function BlogPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams

  const category = resolvedSearchParams?.category

  const response = await getPosts({
    ...(category ? { category } : {}),
  })

  const posts = response?.data?.data ?? []
  const categories = response?.data?.categories ?? []

  return (
    <Section>
      <BlogHero />

      <BlogContent
        posts={posts}
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
