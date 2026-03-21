import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import { EmptyState } from '../common/empty-state'
import { Post } from '@/types/post'

interface SidebarRecentPostsProps {
  posts: Post[]
}

export function SidebarRecentPosts({ posts }: SidebarRecentPostsProps) {
  if (!posts?.length)
    return (
      <EmptyState
        title="No recent posts found."
        description="There are no recent posts to display."
      />
    )

  return (
    <div className="space-y-5 capitalize">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/blog/${post.slug}`}
          className="group flex gap-4"
        >
          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="80px"
                className="object-cover"
              />
            )}
          </div>

          <div className="flex flex-col">
            <h4 className="line-clamp-2 text-sm font-medium transition-colors hover:text-gray-600">
              {post.title}
            </h4>

            <span className="text-muted-foreground mt-1 text-xs">
              {dayjs(post.createdAt).format('MMM D, YYYY')}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
