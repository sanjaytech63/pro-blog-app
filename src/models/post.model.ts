import mongoose, { Schema, Types } from 'mongoose'

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export interface IPost {
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  author: Types.ObjectId
  category: string
  tags: string[]
  likesCount: number
  commentsCount: number
  status: PostStatus
  isDeleted: boolean
  deletedAt?: Date | null
  deletedBy?: Types.ObjectId | null
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    excerpt: String,
    coverImage: String,
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, index: true },
    tags: [{ type: String, index: true }],
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.DRAFT,
      index: true,
    },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: Date,
    deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

PostSchema.index({ title: 'text', content: 'text' })

export const Post =
  mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
