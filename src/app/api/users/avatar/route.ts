import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { userService } from '@/services/user.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { requireUser } from '@/middlewares/guards'
import { z } from 'zod'

const avatarSchema = z.object({
  avatar: z.string().url(),
})

export const PUT = catchAsync(async (req: NextRequest) => {
  const guard = requireUser(req)
  if (guard) return guard

  await connectDB()

  const { avatar } = avatarSchema.parse(await req.json())

  const user = await userService.updateAvatar(req.user!.id, avatar)

  return ApiResponse.success(user, 'Avatar updated')
})
