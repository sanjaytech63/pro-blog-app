import { NextRequest } from 'next/server'
import { connectDB } from '@/src/libs/db'
import { catchAsync } from '@/src/utils/catchAsync'
import { ApiResponse } from '@/src/utils/ApiResponse'
import { registerSchema } from '@/src/validators/auth.schema'
import { authService } from '@/src/services/auth.service'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()
  const { fullName, email, password } = registerSchema.parse(await req.json())
  const result = await authService.register(fullName, email, password)
  return ApiResponse.success(result, 'OTP sent to email for verification')
})
