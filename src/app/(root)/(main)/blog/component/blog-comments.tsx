'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function BlogComments() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<string[]>([])

  const submitComment = () => {
    if (!comment) return

    setComments([...comments, comment])
    setComment('')
  }

  return (
    <div className="">
      <h3 className="mb-4 text-xl font-semibold">Comments</h3>

      <textarea
        className="w-full rounded-lg border p-3"
        rows={3}
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button className="mt-2" onClick={submitComment}>
        Post Comment
      </Button>

      <div className="mt-8 space-y-4">
        {comments.map((c, i) => (
          <div key={i} className="rounded-lg border p-4">
            {c}
          </div>
        ))}
      </div>
    </div>
  )
}
