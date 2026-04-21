import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { CommentEntity } from '@/types/comment'

export const useDeleteComment = (postId: string) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (commentId: string) => {
      await api.delete(`/api/comments/${commentId}`)
    },

    onMutate: async (commentId) => {
      await qc.cancelQueries({ queryKey: ['comments', postId] })

      const prev = qc.getQueryData<CommentEntity[]>(['comments', postId])

      const removeComment = (list: CommentEntity[]): CommentEntity[] =>
        list
          .filter((c) => c._id !== commentId)
          .map((c) => ({
            ...c,
            children: c.children ? removeComment(c.children) : [],
          }))

      qc.setQueryData<CommentEntity[]>(['comments', postId], (old) =>
        removeComment(old ?? []),
      )

      return { prev }
    },

    onError: (_err, _id, ctx) => {
      qc.setQueryData(['comments', postId], ctx?.prev)
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })
}
