import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { userService } from '@/services/user.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { requireUser } from '@/middlewares/guards'

export const GET = catchAsync(async (req: NextRequest) => {
  const guard = requireUser(req)
  if (guard) return guard

  await connectDB()

  const user = await userService.getById(req.user!.id)
  return ApiResponse.success(user)
})
