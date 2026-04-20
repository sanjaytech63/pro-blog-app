'use client'

import { useState } from 'react'
import { useComments } from '@/hooks/useComments'
import { api } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { clientError } from '@/utils/clientError'
import { Loader } from '@/components/ui/loader'

interface Props {
  postId: string
}

export function BlogComments({ postId }: Props) {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const qc = useQueryClient()

  const { data: comments, isLoading } = useComments(postId)

  const submitComment = async () => {
    try {
      if (!comment.trim()) return
      setLoading(true)
      await api.post(`/api/comments/${postId}`, {
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
      {/* ------------------ HEADER ------------------ */}
      <h3 className="text-xl font-semibold">Comments</h3>

      <Textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="resize-none bg-transparent! py-10"
      />

      <Button
        onClick={submitComment}
        disabled={!comment.trim() || loading}
        className="flex items-center gap-2"
      >
        {loading && <Loader className="h-4 w-4 animate-spin" />}
        {loading ? 'Posting...' : 'Post Comment'}
      </Button>
      {/* ------------------ LIST ------------------ */}
      <div className="space-y-4">
        {isLoading ? (
          /* ------------------ SKELETON ------------------ */
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex animate-pulse gap-3">
                  <div className="bg-muted h-9 w-9 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="bg-muted h-3 w-32 rounded" />
                    <div className="bg-muted h-3 w-full rounded" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : comments?.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No comments yet. Be the first 🚀
          </p>
        ) : (
          comments?.map((c) => (
            <Card
              key={c._id}
              className="group rounded-xl border bg-transparent transition hover:shadow-sm"
            >
              <CardContent className="flex gap-3">
                {/* ------------------ AVATAR ------------------ */}
                <Avatar className="h-9 w-9">
                  <AvatarImage src={c.user.avatar} />
                  <AvatarFallback>{c.user.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>

                {/* ------------------ CONTENT ------------------ */}
                <div className="flex-1">
                  {/* HEADER */}
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{c.user.fullName}</p>

                    <span className="text-muted-foreground text-xs">
                      • {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* COMMENT */}
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {c.content}
                  </p>

                  {/* ACTIONS */}
                  <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs opacity-0 transition group-hover:opacity-100">
                    <button className="hover:text-primary">Reply</button>
                    <button className="hover:text-primary">Like</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
