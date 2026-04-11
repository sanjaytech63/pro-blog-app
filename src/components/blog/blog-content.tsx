import { PostGrid } from './post-grid'
import { BlogSidebar } from './blog-sidebar'
import Container from '../container'
import { Post } from '@/types/post'

interface Category {
  id: string
  name: string
  slug: string
}

interface BlogContentProps {
  posts: Post[]
  categories: Category[]
  recentPosts: Post[]
}

export function BlogContent({
  posts,
  categories,
  recentPosts,
}: BlogContentProps) {
  return (
    <Container className="px-4! py-16">
      <div className="grid gap-8 lg:grid-cols-[5fr_1fr]">
        <div>
          <PostGrid posts={posts} />
        </div>

        <div className="rounded-2xl border p-4">
          <BlogSidebar categories={categories} recentPosts={recentPosts} />
        </div>
      </div>
    </Container>
  )
}
