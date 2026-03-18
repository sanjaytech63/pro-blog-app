'use client'

import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { useState } from 'react'

export function BlogActions() {
  const [likes, setLikes] = useState(12)
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <div className="my-12 flex items-center gap-6 border-y py-6">
      <button onClick={toggleLike} className="flex items-center gap-2 text-sm">
        <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : ''} />
        {likes} Likes
      </button>

      <button className="flex items-center gap-2 text-sm">
        <MessageCircle size={18} />
        Comments
      </button>

      <button className="flex items-center gap-2 text-sm">
        <Share2 size={18} />
        Share
      </button>
    </div>
  )
}
