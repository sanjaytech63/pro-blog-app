import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { registerSchema } from '@/validators/auth.schema'
import { authService } from '@/services/auth.service'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()
  const { fullName, email, password } = registerSchema.parse(await req.json())
  const result = await authService.register(fullName, email, password)
  return ApiResponse.success(result, 'OTP sent to email for verification')
})
