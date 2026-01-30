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

  /* =========================
       CURRENT USER
     ========================= */
  async me(): Promise<AuthUser | null> {
    try {
      const res = await api.get<ApiResponse<AuthUser>>('/users/me')
      return res.data.data
    } catch {
      return null
    }
  },
}
