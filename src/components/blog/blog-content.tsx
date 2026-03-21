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
    <Container className="py-16">
      <div className="grid gap-8 lg:grid-cols-[5fr_1fr]">
        <div>
          <PostGrid posts={posts} />
        </div>

        <BlogSidebar categories={categories} recentPosts={recentPosts} />
      </div>
    </Container>
  )
}
