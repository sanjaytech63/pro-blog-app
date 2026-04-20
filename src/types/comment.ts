export interface CommentUser {
  fullName: string
  avatar?: string
}

export interface CommentEntity {
  _id: string
  content: string
  createdAt: string
  user: CommentUser
  parent?: string | null
}
