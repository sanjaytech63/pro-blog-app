import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { commentService } from '@/services/comment.service'
import { verifyAuth } from '@/middlewares/auth.middleware'

export const POST = catchAsync(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ postId: string }> },
  ) => {
    const auth = await verifyAuth(req)
    if (auth) return auth

    await connectDB()

    const { postId } = await params
    const userId = req.user!.id

    const body = await req.json()
    const { content, parent } = body

    const comment = await commentService.create(userId, postId, content, parent)

    return ApiResponse.success(comment, 'Comment added successfully')
  },
)

export const GET = catchAsync(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ postId: string }> },
  ) => {
    await connectDB()

    const { postId } = await params

    const comments = await commentService.list(postId)

    return ApiResponse.success(comments)
  },
)
