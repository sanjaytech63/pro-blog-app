import dayjs from 'dayjs'
import readingTime from 'reading-time'
import { Post } from '@/types/blog'
import { OptimizedImage } from '@/components/opt-image'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface Props {
  post: Post
}

export function BlogHero({ post }: Props) {
  const content = post?.content ?? ''
  const stats = readingTime(content)

  return (
    <div className="mb-14">
      <div className="mb-6 flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.author.fullName} />
        </Avatar>

        <div>
          <p className="text-sm font-semibold">{post.author.fullName}</p>
          assa
          <p className="text-muted-foreground text-xs">
            {dayjs(post.createdAt).format('MMM D, YYYY')} • {stats.text}
          </p>
        </div>
      </div>

      <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
        {post.title}
      </h1>

      <p className="text-muted-foreground mb-8 text-lg">{post.content}</p>

      <div className="relative h-105 w-full overflow-hidden rounded-2xl">
        <OptimizedImage src={post.coverImage} alt={post.title} priority />
      </div>
    </div>
  )
}
