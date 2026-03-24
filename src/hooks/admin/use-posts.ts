'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CreatePostDTO, ListPostsQuery, UpdatePostDTO } from '@/types/post'
import { toast } from 'sonner'
import { postClientService } from '@/services/client/post.service'
import { clientError } from '@/utils/clientError'

interface UpdatePostMutation {
  id: string
  payload: UpdatePostDTO
}

export const usePosts = (params: ListPostsQuery) => {
  return useQuery({
    queryKey: ['admin-posts', params],
    queryFn: () =>
      postClientService.getPosts({
        ...params,
        includeDeleted: true,
      }),
    placeholderData: (previousData) => previousData,
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePostDTO) =>
      postClientService.createPost(payload),
    onSuccess: (response) => {
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] })
    },
    onError: (error) => {
      clientError(error)
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdatePostMutation) =>
      postClientService.updatePost(id, payload),
    onSuccess: (response) => {
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => postClientService.deletePost(id),

    onSuccess: (response) => {
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] })
    },

    onError: (error) => {
      console.error(error)
      toast.error('Failed to delete post')
    },
  })
}
