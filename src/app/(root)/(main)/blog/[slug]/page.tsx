import { Metadata } from 'next'
import { Section } from '@/components/common/section'
import Container from '@/components/container'
import { ReadingProgress } from '../component/reading-progress'
import { BlogHero } from '../component/blog-hero'
import { BlogAuthor } from '../component/blog-author'
import { BlogComments } from '../component/blog-comments'
import { getPostBySlug } from '@/services/server/post.api'
import { EmptyState } from '@/components/common/empty-state'
import { SinglePostContent } from '../component/single-post-content'
import { capitalize } from '@/utils/capitalize'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return {}

  return {
    title: capitalize(post.title),
    description: post.content.slice(0, 160),
  }
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <EmptyState title="Post Not Found" />
      </div>
    )
  }

  return (
    <>
      <ReadingProgress />
      <Section>
        <Container>
          <main className="space-y-10">
            <BlogHero post={post} />
            <SinglePostContent post={post} />
            {post && (
              <BlogAuthor
                author={{
                  fullName: post.author.fullName || '',
                  avatar: post.author.avatar || '/images/default-avatar.png',
                }}
              />
            )}
            <BlogComments postId={post._id} />
          </main>
        </Container>
      </Section>
    </>
  )
}
