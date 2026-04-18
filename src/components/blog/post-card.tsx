import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import dayjs from 'dayjs'
import { OptimizedImage } from '../opt-image'
import { Post } from '@/types/post'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl pt-0 transition hover:shadow-xl">
      <Link href={`/blog/${post.slug}`} className="relative block">
        <div className="relative h-52 w-full">
          <OptimizedImage src={post.coverImage} alt={post.title} priority />
        </div>
      </Link>

      <CardContent className="">
        <p className="text-muted-foreground text-xs">
          {post.category} • {dayjs(post.createdAt).format('MMM D, YYYY')}
        </p>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="hover:text-primary mt-2 line-clamp-2 text-lg font-semibold">
            {post.title}
          </h3>
        </Link>

        <div className="prose prose-neutral dark:prose-invert line-clamp-5 max-w-none text-sm">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </CardContent>
    </Card>
  )
}
