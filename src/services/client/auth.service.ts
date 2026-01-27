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
  login(data: LoginPayload): Promise<ApiResponse<AuthToken>> {
    return api.post('/auth/login', data)
  },

  register(data: RegisterPayload): Promise<ApiResponse<AuthUser>> {
    return api.post('/auth/register', data)
  },

  forgot(data: ForgotPasswordPayload): Promise<ApiResponse<null>> {
    return api.post('/auth/forgot-password', data)
  },

  reset(token: string, data: ResetPasswordPayload): Promise<ApiResponse<null>> {
    return api.post(`/auth/reset-password?token=${token}`, data)
  },

  /* =========================
       VERIFY OTP
    ========================= */
  verifyOtp(email: string, otp: string): Promise<ApiResponse<null>> {
    return api.post('/auth/verify-otp', { email, otp })
  },

  /* =========================
       RESEND OTP
    ========================= */
  resendOtp(email: string): Promise<ApiResponse<null>> {
    return api.post('/auth/send-otp', { email })
  },

  /* =========================
     LOGOUT
  ========================= */
  logout(): Promise<ApiResponse<null>> {
    return api.post('/auth/logout')
  },

  /* =========================
     CURRENT USER
  ========================= */
  me(): Promise<ApiResponse<AuthUser>> {
    return api.get('/users/me')
  },
}
