// 👍 User Agent Fingerprint
// 👍 Location Meta
// 👍 IP Logging
// 👍 Ability to cancel reset

import { authService } from '@/services/auth.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { loginSchema } from '@/validators/auth.schema'
import { setAuthCookies } from '@/lib/auth-cookies'

export const POST = catchAsync(async (req) => {
  const { email, password } = loginSchema.parse(await req.json())

  const { accessToken, refreshToken } = await authService.login(email, password)

  await setAuthCookies(accessToken, refreshToken)

  return ApiResponse.success(null, 'Login successful')
})
