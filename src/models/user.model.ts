import mongoose, { Schema, Types } from 'mongoose'

export interface IUser {
  fullName: string
  email: string
  password?: string
  avatar?: string

  verifyOTP?: string
  verifyOTPExpires?: Date
  isVerified: boolean

  resetPasswordToken?: string
  resetPasswordExpires?: Date

  refreshToken?: string
  refreshTokenExpires?: Date

  isDeleted: boolean
  deletedAt?: Date
  deletedBy?: Types.ObjectId

  role: 'user' | 'admin'

  provider: 'credentials' | 'google' | 'github'

  providerId?: string
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    provider: {
      type: String,
      enum: ['credentials', 'google', 'github'],
      required: true,
      default: 'credentials',
    },

    providerId: {
      type: String,
      index: true,
    },

    password: {
      type: String,
      required: function (this: IUser): boolean {
        return this.provider === 'credentials'
      },
      select: false,
    },

    avatar: String,

    /* -------- OTP Verification -------- */
    verifyOTP: {
      type: String,
      select: false,
    },

    verifyOTPExpires: {
      type: Date,
      index: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    /* -------- Password Reset -------- */
    resetPasswordToken: {
      type: String,
      select: false,
      index: true,
    },

    resetPasswordExpires: {
      type: Date,
      index: true,
    },

    /* -------- Refresh Token -------- */
    refreshToken: {
      type: String,
      select: false,
      index: true,
    },

    refreshTokenExpires: {
      type: Date,
      index: true,
    },

    /* -------- Access Control -------- */
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    /* -------- Soft Delete -------- */
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: Date,

    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  },
)

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema)
