'use client'

import Image from 'next/image'
import { FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Post } from '@/types/post'
import { cn } from '@/lib/utils'

interface Props {
  posts: Post[]
}

export const RecentPosts = ({ posts }: Props) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="hover:bg-muted/50 flex items-center justify-between gap-4 rounded-lg p-2 transition"
        >
          <div className="flex items-center gap-4">
            <div className="bg-muted relative h-14 w-20 shrink-0 overflow-hidden rounded-md border">
              {post?.coverImage ? (
                <Image
                  src={post?.coverImage}
                  alt={post?.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="max-w-55 md:max-w-md">
              <p className="truncate font-medium capitalize">{post.title}</p>

              <p className="text-muted-foreground text-xs">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Badge
            className={cn(
              post.status === 'PUBLISHED'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700',
            )}
          >
            {post.status.toLowerCase()}
          </Badge>
        </div>
      ))}
    </div>
  )
}
