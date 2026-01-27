import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { verifyOtpSchema } from '@/validators/auth.schema'
import { authService } from '@/services/auth.service'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()
  const { email, otp } = verifyOtpSchema.parse(await req.json())
  const result = await authService.verifyOtp(email, otp)
  return ApiResponse.success(result, 'Account verified successfully')
})
