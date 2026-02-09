import { NextRequest } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { requireUser } from '@/middlewares/guards'
import { env } from '@/config/env'

export const POST = catchAsync(async (req: NextRequest) => {
  const guard = requireUser(req)
  if (guard) return guard

  const timestamp = Math.floor(Date.now() / 1000)

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: 'avatars',
    },
    env.CLOUDINARY_API_SECRET!,
  )

  return ApiResponse.success({
    timestamp,
    signature,
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    folder: 'avatars',
  })
})
