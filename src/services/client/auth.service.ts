import { api } from '@/lib/axios'
import { ApiResponse } from '@/types/api'
import {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthUser,
  AuthToken,
} from '@/types/auth'
import { UpdatePasswordDto } from '@/validators/auth.schema'
import { UpdateProfileDto } from '@/validators/user.schema'

export const authService = {
  async login(data: LoginPayload): Promise<ApiResponse<AuthToken>> {
    const res = await api.post<ApiResponse<AuthToken>>('/api/auth/login', data)
    return res.data
  },

  async register(data: RegisterPayload): Promise<ApiResponse<AuthUser>> {
    const res = await api.post<ApiResponse<AuthUser>>(
      '/api/auth/register',
      data,
    )
    return res.data
  },

  async forgot(data: ForgotPasswordPayload): Promise<ApiResponse<null>> {
    const res = await api.post<ApiResponse<null>>(
      '/api/auth/forgot-password',
      data,
    )
    return res.data
  },

  async reset(
    token: string,
    data: ResetPasswordPayload,
  ): Promise<ApiResponse<null>> {
    const res = await api.post<ApiResponse<null>>(
      `/api/auth/reset-password?token=${token}`,
      data,
    )
    return res.data
  },

  async verifyOtp(email: string, otp: string): Promise<ApiResponse<null>> {
    const res = await api.post<ApiResponse<null>>('/api/auth/verify-otp', {
      email,
      otp,
    })
    return res.data
  },

  async resendOtp(email: string): Promise<ApiResponse<null>> {
    const res = await api.post<ApiResponse<null>>('/api/auth/send-otp', {
      email,
    })
    return res.data
  },

  async logout(): Promise<ApiResponse<null>> {
    const res = await api.post<ApiResponse<null>>('/api/auth/logout')
    return res.data
  },

  async updateProfile(data: UpdateProfileDto): Promise<ApiResponse<AuthUser>> {
    const res = await api.put<ApiResponse<AuthUser>>(
      '/api/users/update-profile',
      data,
    )
    return res.data
  },

  async me(): Promise<AuthUser | null> {
    try {
      const res = await api.get<ApiResponse<AuthUser | null>>('/api/users/me')
      return res.data.success ? (res.data.data ?? null) : null
    } catch {
      return null
    }
  },

  async updatePassword(data: UpdatePasswordDto): Promise<ApiResponse<null>> {
    const res = await api.put<ApiResponse<null>>(
      '/api/users/change-password',
      data,
    )
    return res.data
  },

  async getAvatarUploadSignature() {
    const res = await api.post<ApiResponse<AuthUser>>('/api/users/avatar/sign')
    return res.data.data
  },

  async updateAvatar(avatar: string) {
    const res = await api.put<ApiResponse<AuthUser>>('/api/users/avatar', {
      avatar,
    })
    return res.data
  },
}
