'use server'

import { redirect } from 'next/navigation'
import { authService } from '@/services/client/auth.service'
import {
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOtpSchema,
  sendOtpSchema,
} from '@/validators/auth.schema'
import { env } from '@/config/env'

/* =========================
   HELPERS
========================= */

function parseFormData<T>(
  formData: FormData,
  schema: { parse: (data: unknown) => T },
): T {
  const raw = Object.fromEntries(formData.entries())
  return schema.parse(raw)
}

/* =========================
   REGISTER
========================= */
export async function registerAction(formData: FormData) {
  const data = parseFormData(formData, registerSchema)

  await authService.register(data)

  redirect(`/verify-otp`)
}

/* =========================
   VERIFY OTP
========================= */
export async function verifyOtpAction(formData: FormData) {
  const data = parseFormData(formData, verifyOtpSchema)

  await authService.verifyOtp(data.email, data.otp)

  redirect('/login')
}

/* =========================
   RESEND OTP
========================= */
export async function resendOtpAction(formData: FormData) {
  const data = parseFormData(formData, sendOtpSchema)

  await authService.resendOtp(data.email)

  redirect(`/verify-otp?email=${encodeURIComponent(data.email)}&resent=true`)
}

/* =========================
   FORGOT PASSWORD
========================= */
export async function forgotPasswordAction(formData: FormData) {
  const data = parseFormData(formData, forgotPasswordSchema)

  await authService.forgot({ email: data.email })

  redirect('/login')
}
