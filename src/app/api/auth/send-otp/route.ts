import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { sendOtpSchema } from '@/validators/auth.schema'
import { authService } from '@/services/auth.service'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()
  const { email } = sendOtpSchema.parse(await req.json())
  const result = await authService.sendOtp(email)
  return ApiResponse.success(result, 'OTP sent to email for verification')
})
