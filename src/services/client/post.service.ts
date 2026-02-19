import { api } from '@/lib/axios'
import { ApiResponse } from '@/types/api'
import {
  PaginatedResponse,
  PostEntity,
  PostStatus,
  UpdatePostDTO,
} from '@/types/post'

interface ListPostsParams {
  page?: number
  limit?: number
  search?: string
  status?: PostStatus
  category?: string
  includeDeleted?: boolean
}

interface CreatePostPayload {
  title: string
  content: string
  excerpt?: string
  category: string
  tags?: string[]
  status: PostStatus
  coverImageBase64?: string
}

class PostClientService {
  /* ------------------ Public APIs ------------------ */

  async getPosts(params?: ListPostsParams) {
    const res = await api.get<ApiResponse<PaginatedResponse<PostEntity>>>(
      '/posts',
      { params },
    )

    return res.data
  }

  async getPostBySlug(slug: string) {
    const res = await api.get<ApiResponse<PostEntity>>(`/posts/${slug}`)

    return res.data
  }

  /* ------------------ Admin APIs ------------------ */

  async createPost(payload: CreatePostPayload) {
    const res = await api.post('/admin/posts', payload)
    return res.data
  }

  async updatePost(id: string, payload: UpdatePostDTO) {
    const res = await api.put(`/admin/posts/${id}`, payload)
    return res.data
  }

  async deletePost(id: string) {
    const res = await api.delete(`/admin/posts/${id}`)
    return res.data
  }

  async restorePost(id: string) {
    const res = await api.patch<ApiResponse<PostEntity>>(`/posts/${id}/restore`)

    return res.data
  }
}

export const postClientService = new PostClientService()
