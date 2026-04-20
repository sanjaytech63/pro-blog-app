import mongoose, { Schema, models } from 'mongoose'

const commentSchema = new Schema(
  {
    content: { type: String, required: true },

    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  { timestamps: true },
)

commentSchema.index({ post: 1, createdAt: -1 })

export const Comment =
  models.Comment || mongoose.model('Comment', commentSchema)
