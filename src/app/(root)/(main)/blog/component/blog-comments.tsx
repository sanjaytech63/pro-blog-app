'use client'

import { useState } from 'react'
import { useComments } from '@/hooks/useComments'
import { api } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader } from '@/components/ui/loader'
import { clientError } from '@/utils/clientError'
import { CommentItem } from './comment-item'
import { Card } from '@/components/ui/card'

interface Props {
  postId: string
}

export function BlogComments({ postId }: Props) {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const qc = useQueryClient()
  const { data: comments = [], isLoading } = useComments(postId)

  const submitComment = async () => {
    if (!comment.trim()) return

    try {
      setLoading(true)

      await api.post(`/api/comments/post/${postId}`, {
        content: comment,
      })

      setComment('')

      qc.invalidateQueries({ queryKey: ['comments', postId] })
    } catch (error) {
      clientError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Comments</h3>

      <Textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="h-20"
      />

      <Button onClick={submitComment} disabled={loading}>
        {loading ? <Loader label="Commenting..." /> : 'Comment'}
      </Button>

      <div>
        {isLoading ? (
          <Card className="p-4">
            <div className="flex animate-pulse gap-3">
              <div className="bg-muted h-9 w-9 rounded-full" />

              <div className="flex-1 space-y-2">
                <div className="bg-muted h-3 w-32 rounded" />
                <div className="bg-muted h-3 w-full rounded" />
              </div>
            </div>
          </Card>
        ) : comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          comments.map((c) => (
            <CommentItem key={c._id} comment={c} postId={postId} />
          ))
        )}
      </div>
    </div>
  )
}
