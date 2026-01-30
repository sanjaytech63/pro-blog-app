import { authService } from '@/services/auth.service'
import { connectDB } from '@/lib/db'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { resendVerificationSchema } from '@/validators/auth.schema'
import { NextRequest } from 'next/server'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()
  const { email } = resendVerificationSchema.parse(await req.json())

  await authService.resendVerificationOtp(email)

  return ApiResponse.success(null, 'OTP resent successfully')
})
