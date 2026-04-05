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
    const res = await api.post<ApiResponse<AuthToken>>('/auth/login', data)
    return res.data
  },

  async register(data: RegisterPayload): Promise<ApiResponse<AuthUser>> {
    const res = await api.post<ApiResponse<AuthUser>>('/auth/register', data)
    return res.data
  },

  async forgot(data: ForgotPasswordPayload): Promise<ApiResponse<null>> {
    const res = await api.post<ApiResponse<null>>('/auth/forgot-password', data)
    return res.data
  },

  async reset(
    token: string,
    data: ResetPasswordPayload,
  ): Promise<ApiResponse<null>> {
    const res = await api.post<ApiResponse<null>>(
      `/auth/reset-password?token=${token}`,
      data,
    )
    return res.data
  },

  async verifyOtp(email: string, otp: string): Promise<ApiResponse<null>> {
    const res = await api.post<ApiResponse<null>>('/auth/verify-otp', {
      email,
      otp,
    })
    return res.data
  },

  async resendOtp(email: string): Promise<ApiResponse<null>> {
    const res = await api.post<ApiResponse<null>>('/auth/send-otp', { email })
    return res.data
  },

  async logout(): Promise<ApiResponse<null>> {
    const res = await api.post<ApiResponse<null>>('/auth/logout')
    return res.data
  },

  async updateProfile(data: UpdateProfileDto): Promise<ApiResponse<AuthUser>> {
    const res = await api.put<ApiResponse<AuthUser>>(
      '/users/update-profile',
      data,
    )
    return res.data
  },

  async me(): Promise<AuthUser | null> {
    try {
      const res = await api.get<ApiResponse<AuthUser | null>>('/users/me')
      return res.data.success ? (res.data.data ?? null) : null
    } catch {
      return null
    }
  },

  async updatePassword(data: UpdatePasswordDto): Promise<ApiResponse<null>> {
    const res = await api.put<ApiResponse<null>>('/users/change-password', data)
    return res.data
  },

  async getAvatarUploadSignature() {
    const res = await api.post<ApiResponse<AuthUser>>('/users/avatar/sign')
    return res.data.data
  },

  async updateAvatar(avatar: string) {
    const res = await api.put<ApiResponse<AuthUser>>('/users/avatar', {
      avatar,
    })
    return res.data
  },
}
