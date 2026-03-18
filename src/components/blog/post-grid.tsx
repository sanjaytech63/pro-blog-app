import { Post } from '@/types/blog'
import { PostCard } from './post-card'
import { EmptyState } from '../common/empty-state'

interface PostGridProps {
  posts: Post[]
}

export function PostGrid({ posts = [] }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <EmptyState
        title="No posts available yet."
        description="We're working hard to bring you the best content."
      />
    )
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}
