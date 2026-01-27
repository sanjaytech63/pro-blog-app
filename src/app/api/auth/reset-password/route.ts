import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { resetPasswordSchema } from '@/validators/auth.schema'
import { authService } from '@/services/auth.service'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()
  const { token, password } = resetPasswordSchema.parse(await req.json())
  await authService.resetPassword(token, password)
  return ApiResponse.success(null, 'Password reset successful')
})
