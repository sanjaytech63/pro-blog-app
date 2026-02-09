import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { userService } from '@/services/user.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { requireUser } from '@/middlewares/guards'
import { updatePasswordSchema } from '@/validators/auth.schema'

export const PUT = catchAsync(async (req: NextRequest) => {
  const guard = requireUser(req)
  if (guard) return guard

  await connectDB()

  const body = updatePasswordSchema.parse(await req.json())

  await userService.updatePassword(req.user!.id, body)

  return ApiResponse.success(null, 'Password updated successfully')
})
