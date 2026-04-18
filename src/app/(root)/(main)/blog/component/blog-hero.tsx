import dayjs from 'dayjs'
import readingTime from 'reading-time'
import { OptimizedImage } from '@/components/opt-image'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Post } from '@/types/post'
import { BlogActions } from './blog-actions'

interface Props {
  post: Post
}

export function BlogHero({ post }: Props) {
  const stats = readingTime(post.content || '')

  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={post.author.avatar || '/images/default-avatar.png'}
            />
          </Avatar>

          <div>
            <p className="text-sm font-semibold">{post.author.fullName}</p>
            <p className="text-muted-foreground text-xs">
              {dayjs(post.createdAt).format('MMM D, YYYY')} • {stats.text}
            </p>
          </div>
        </div>
        <BlogActions />
      </div>

      <h1 className="mb-6 text-xl leading-tight font-bold capitalize md:text-2xl">
        {post.title}
      </h1>

      {post.coverImage && (
        <div className="relative overflow-hidden">
          <OptimizedImage
            containerClassName="h-[500px] rounded-xl"
            src={post.coverImage}
            alt={post.title}
            priority
          />
        </div>
      )}
    </div>
  )
}
