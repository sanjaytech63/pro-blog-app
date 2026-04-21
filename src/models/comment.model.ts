import mongoose, { Schema, Types } from 'mongoose'

const commentSchema = new Schema(
  {
    post: {
      type: Types.ObjectId,
      ref: 'Post',
      required: true,
      index: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    parent: {
      type: Types.ObjectId,
      ref: 'Comment',
      default: null,
      index: true,
    },
  },
  { timestamps: true },
)

export const Comment =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema)
