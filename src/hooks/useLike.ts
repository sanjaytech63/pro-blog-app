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
  likesCount: number
}

export const useLike = (postId: string) => {
  const qc = useQueryClient()

  return useMutation<LikeResponse>({
    mutationFn: async () => {
      const res = await api.post(`/api/likes/${postId}`)
      return res.data.data
    },

    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ['post', postId] })

      const prev = qc.getQueryData<PostEntity>(['post', postId])

      if (prev) {
        const isLiked = prev.isLiked

        qc.setQueryData(['post', postId], {
          ...prev,
          isLiked: !isLiked,
          likesCount: isLiked
            ? Math.max(prev.likesCount - 1, 0)
            : prev.likesCount + 1,
        })
      }

      return { prev }
    },

    onSuccess: (data) => {
      qc.setQueryData(['post', postId], (old: PostEntity) =>
        old
          ? {
              ...old,
              isLiked: data.liked,
              likesCount: data.likesCount,
            }
          : old,
      )
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['post', postId] })
    },
  })
}
