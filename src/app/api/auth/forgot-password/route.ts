import { NextRequest } from 'next/server'
import { connectDB } from '@/libs/db'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { forgotPasswordSchema } from '@/validators/auth.schema'
import { authService } from '@/services/auth.service'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()
  const { email } = forgotPasswordSchema.parse(await req.json())
  const result = await authService.forgotPassword(email)
  return ApiResponse.success(result, 'Reset link sent')
})
