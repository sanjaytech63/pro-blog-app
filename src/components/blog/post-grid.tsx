import { PostCard } from './post-card'
import { Post } from '@/types/post'

interface PostGridProps {
  posts: Post[]
}

export function PostGrid({ posts = [] }: PostGridProps) {
  return (
    <div className="grid gap-8 capitalize sm:grid-cols-2 lg:grid-cols-4">
      {posts && posts?.map((post) => <PostCard key={post._id} post={post} />)}
    </div>
  )
}
