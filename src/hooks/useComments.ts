import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { CommentEntity } from '@/types/comment'

export const useComments = (postId: string) => {
  return useQuery<CommentEntity[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await api.get(`/api/comments/${postId}`)
      return res.data.data
    },
  })
}
