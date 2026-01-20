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
  },
  { timestamps: true },
)

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema)
