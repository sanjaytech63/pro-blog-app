import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  fullName: string
  email: string
  password: string
  avatar?: string

  verifyOTP?: string
  verifyOTPExpires?: Date
  isVerified: boolean

  resetPasswordToken?: string
  resetPasswordExpires?: Date

  isDeleted: boolean
  deletedAt?: Date
  deletedBy?: mongoose.Types.ObjectId
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: { type: String, required: true },

    avatar: String,

    // OTP Verification
    verifyOTP: String,
    verifyOTPExpires: Date,
    isVerified: { type: Boolean, default: false },

    // Password Reset
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true },
)

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema)
