import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Section } from '@/components/common/section'
import Container from '@/components/container'
import { getPostBySlug } from '@/services/server/post.service'
import { ReadingProgress } from '../component/reading-progress'
import { BlogHero } from '../component/blog-hero'
import { BlogActions } from '../component/blog-actions'
import { BlogContent } from '@/components/blog/blog-content'
import { BlogAuthor } from '../component/blog-author'
import { BlogComments } from '../component/blog-comments'
import { Post } from '@/types/post'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return {}

  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      images: [post.coverImage || ''],
    },
  }
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params

  const post: Post | null = await getPostBySlug(slug)

  if (!post) notFound()

  const posts: Post[] = [post]

  const categories = post?.category
    ? [
        {
          id: post.category,
          name: post.category,
          slug: post.category.toLowerCase().replace(/\s+/g, '-'),
        },
      ]
    : []

  const recentPosts: Post[] = posts

  return (
    <>
      <ReadingProgress />

      <Section>
        <Container className="max-w-4xl">
          <BlogHero post={post} />

          <BlogActions />

          <BlogContent
            posts={posts}
            categories={categories}
            recentPosts={recentPosts}
          />

          <BlogAuthor
            author={{
              fullName: post.author.fullName,
              avatar: post.author.avatar || '/images/default-avatar.png',
            }}
          />

          <BlogComments />
        </Container>
      </Section>
    </>
  )
}
