import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { likeService } from '@/services/like.service'
import { verifyAuth } from '@/middlewares/auth.middleware'

export const POST = catchAsync(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ postId: string }> },
  ) => {
    await connectDB()

    const auth = await verifyAuth(req)
    if (auth) return auth

    const { postId } = await params
    const userId = req.user!.id

    const result = await likeService.toggleLike(userId, postId)

    return ApiResponse.success(result, 'Like toggled successfully')
  },
)
