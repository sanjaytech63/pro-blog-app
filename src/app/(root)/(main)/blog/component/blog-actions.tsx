'use client'

import { Heart, Share2 } from 'lucide-react'
import { useLike } from '@/hooks/useLike'
import { Post } from '@/types/post'

interface Props {
  post: Post
}

export function BlogActions({ post }: Props) {
  const { mutate, isPending } = useLike(post._id.toString())

  return (
    <div className="flex items-center gap-6">
      <button
        disabled={isPending}
        onClick={() => mutate()}
        className="flex items-center gap-2 text-sm"
      >
        <Heart
          size={22}
          className={
            post.likesCount
              ? 'fill-red-500 text-red-500'
              : 'text-muted-foreground'
          }
        />
        {post?.likesCount} Likes
      </button>

      <button className="flex items-center gap-2 text-sm">
        <Share2 size={22} />
        Share
      </button>
    </div>
  )
}
