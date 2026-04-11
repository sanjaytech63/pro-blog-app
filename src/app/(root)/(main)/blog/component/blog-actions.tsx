'use client'

import { Heart, Share2 } from 'lucide-react'
import { useState } from 'react'

export function BlogActions() {
  const [likes, setLikes] = useState(12)
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <div className="flex items-center gap-6">
      <button
        onClick={toggleLike}
        className="flex cursor-pointer items-center gap-2 text-sm"
      >
        <Heart size={22} className={liked ? 'fill-red-500 text-red-500' : ''} />
        {likes} Likes
      </button>

      <button className="flex cursor-pointer items-center gap-2 text-sm">
        <Share2 size={22} />
        Share
      </button>
    </div>
  )
}
