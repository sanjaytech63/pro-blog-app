'use client'

import { useState } from 'react'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import { api } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'
import { CommentEntity } from '@/types/comment'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { Heart, Reply, Trash2 } from 'lucide-react'

interface Props {
  comment: CommentEntity
  postId: string
}

export function CommentItem({ comment, postId }: Props) {
  const [reply, setReply] = useState('')
  const [showReply, setShowReply] = useState(false)
  const [loading, setLoading] = useState(false)

  const qc = useQueryClient()
  const { mutate: deleteComment } = useDeleteComment(postId)

  const submitReply = async () => {
    if (!reply.trim()) return

    try {
      setLoading(true)

      await api.post(`/api/comments/post/${postId}`, {
        content: reply,
        parent: comment._id,
      })

      setReply('')
      setShowReply(false)

      qc.invalidateQueries({ queryKey: ['comments', postId] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 ml-4 pl-4">
      <Card className="group border bg-transparent transition hover:shadow-sm">
        <CardContent className="flex gap-3 p-4">
          {/* AVATAR */}
          <Avatar className="h-9 w-9">
            <AvatarImage src={comment.user?.avatar || ''} />
            <AvatarFallback>
              {comment.user?.fullName?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>

          {/* CONTENT */}
          <div className="flex-1">
            {/* HEADER */}
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">
                {comment.user?.fullName || 'User'}
              </p>

              <span className="text-muted-foreground text-xs">
                • {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* TEXT */}
            <p className="text-muted-foreground mt-1 text-sm">
              {comment.content}
            </p>

            {/* ACTIONS (hover visible) */}
            <div className="mt-2 flex items-center gap-4 text-xs opacity-0 transition group-hover:opacity-100">
              <button
                onClick={() => setShowReply((s) => !s)}
                className="hover:text-primary flex items-center gap-1"
              >
                <Reply size={14} />
                Reply
              </button>

              <button className="hover:text-primary flex items-center gap-1">
                <Heart size={14} />
                Like
              </button>

              {comment.isOwner && (
                <button
                  onClick={() => deleteComment(comment._id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              )}
            </div>

            {/* REPLY BOX */}
            {showReply && (
              <div className="mt-3 space-y-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="resize-none"
                />

                <div className="flex gap-2">
                  <Button size="sm" onClick={submitReply} disabled={loading}>
                    {loading ? 'Sending...' : 'Reply'}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowReply(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 🔥 CHILDREN (recursive) */}
      {comment.children?.map((child) => (
        <CommentItem key={child._id} comment={child} postId={postId} />
      ))}
    </div>
  )
}
