import { NextRequest } from 'next/server'
import { connectDB } from '@/src/libs/db'
import { ApiResponse } from '@/src/utils/ApiResponse'
import { catchAsync } from '@/src/utils/catchAsync'
import { sendOtpSchema } from '@/src/validators/auth.schema'
import { authService } from '@/src/services/auth.service'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()
  const { email } = sendOtpSchema.parse(await req.json())
  const result = await authService.sendOtp(email)
  return ApiResponse.success(result, 'OTP sent to email for verification')
})
