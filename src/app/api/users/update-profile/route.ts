import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { updateProfileSchema } from '@/validators/user.schema'
import { userService } from '@/services/user.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { requireUser } from '@/middlewares/guards'

export const PUT = catchAsync(async (req: NextRequest) => {
  const guard = requireUser(req)
  if (guard) return guard

  await connectDB()

  const body = updateProfileSchema.parse(await req.json())
  const updatedUser = await userService.updateProfile(req.user!.id, body)

  return ApiResponse.success(updatedUser, 'Profile updated')
})
