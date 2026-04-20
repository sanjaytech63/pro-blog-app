import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
export interface PostEntity {
  _id: string
  title: string

  likesCount: number
  isLiked: boolean

  content?: string
  coverImage?: string
}

interface LikeResponse {
  liked: boolean
}

export const useLike = (postId: string) => {
  const qc = useQueryClient()

  return useMutation<LikeResponse, Error, void, { prev?: PostEntity }>({
    mutationFn: async () => {
      const res = await api.post(`/api/likes/${postId}`)
      return res.data.data
    },

    /* ------------------ OPTIMISTIC UPDATE ------------------ */
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ['post', postId] })

      const prev = qc.getQueryData<PostEntity>(['post', postId])

      if (prev) {
        const isLiked = prev.isLiked

        qc.setQueryData<PostEntity>(['post', postId], {
          ...prev,
          isLiked: !isLiked,
          likesCount: isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
        })
      }

      return { prev }
    },

    /* ------------------ ROLLBACK ------------------ */
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(['post', postId], ctx.prev)
      }
    },

    /* ------------------ SYNC ------------------ */
    onSuccess: (data) => {
      qc.setQueryData<PostEntity>(['post', postId], (old) =>
        old
          ? {
              ...old,
              isLiked: data.liked,
            }
          : old,
      )
    },

    /* ------------------ REVALIDATE ------------------ */
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['post', postId] })
    },
  })
}
