export interface CreatePostDTO {
  title: string
  content: string
  excerpt?: string
  category: string
  tags: string[]
  status: 'DRAFT' | 'PUBLISHED'
  coverImageBase64?: string
}

export type UpdatePostDTO = Partial<CreatePostDTO>

export type PostStatus = 'DRAFT' | 'PUBLISHED'

export interface PostAuthor {
  _id: string
  fullName: string
  email?: string
  avatar?: string
}

export interface PostEntity {
  _id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  author: PostAuthor
  category: string
  tags: string[]
  likesCount: number
  commentsCount: number
  status: PostStatus
  createdAt: string
  updatedAt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ListPostsQuery {
  page?: number
  limit?: number
  search?: string
  status?: PostStatus
  category?: string
  includeDeleted?: boolean
}

export interface Author {
  _id: string
  fullName: string
  email: string
  avatar?: string
}

export interface Post {
  _id: string
  title: string
  slug: string
  content: string
  coverImage?: string
  author: Author
  category: string
  tags: string[]
  likesCount: number
  commentsCount: number
  status: 'DRAFT' | 'PUBLISHED'
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  slug: string
  name: string
}

export interface Props {
  categories: Category[]
}
