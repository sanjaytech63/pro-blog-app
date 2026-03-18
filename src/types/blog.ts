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
