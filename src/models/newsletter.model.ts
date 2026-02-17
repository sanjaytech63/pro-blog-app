import { Schema, model, models } from 'mongoose'

const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'unsubscribed'],
      default: 'active',
      index: true,
    },
    source: {
      type: String,
      default: 'website',
    },
  },
  { timestamps: true },
)

export const Newsletter =
  models.Newsletter || model('Newsletter', newsletterSchema)
