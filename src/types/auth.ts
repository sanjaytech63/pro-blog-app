export type UserRole = 'user' | 'admin'

// Request payloads
export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  fullName: string
  email: string
  password: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  password: string
}

// Response data
export interface AuthUser {
  _id: string
  fullName: string
  email: string
  role: 'user' | 'admin'
  userId?: string
  isVerified?: boolean
  avatar?: string
  provider?: string
  isDeleted?: boolean
  apiKey: string
  timestamp: string
  signature: string
  folder: string
  cloudName: string
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
}

export type AccessTokenPayload = {
  id: string
  role: 'user' | 'admin'
  iat: number
  exp: number
  isVerified: boolean
}

export interface AdminUsersCache {
  users: AuthUser[]
  total: number
  page: number
  limit: number
  _id?: string
}
