import dayjs from 'dayjs'
import { Post } from '@/types/blog'
import { OptimizedImage } from '@/components/opt-image'

interface Props {
  post: Post
}

export function BlogPostHeader({ post }: Props) {
  return (
    <div className="mb-10">
      <p className="text-muted-foreground text-sm">
        {post.category} • {dayjs(post.createdAt).format('MMM D, YYYY')}
      </p>

      <h1 className="mt-3 text-4xl leading-tight font-bold">{post.title}</h1>

      <div className="relative mt-6 h-[420px] w-full overflow-hidden rounded-2xl">
        <OptimizedImage src={post.coverImage} alt={post.title} priority />
      </div>
    </div>
  )
}
