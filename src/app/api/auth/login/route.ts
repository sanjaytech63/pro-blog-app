// 👍 User Agent Fingerprint
// 👍 Location Meta
// 👍 IP Logging
// 👍 Ability to cancel reset

import { NextRequest } from 'next/server'
import { connectDB } from '@/src/libs/db'
import { authService } from '@/src/services/auth.service'
import { ApiResponse } from '@/src/utils/ApiResponse'
import { catchAsync } from '@/src/utils/catchAsync'
import { loginSchema } from '@/src/validators/auth.schema'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()
  const { email, password } = loginSchema.parse(await req.json())

  const result = await authService.login(email, password)

  return ApiResponse.success(result, 'Login successful')
})
