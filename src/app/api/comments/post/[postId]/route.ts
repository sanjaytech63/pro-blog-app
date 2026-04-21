import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { commentService } from '@/services/comment.service'
import { requireUser } from '@/middlewares/guards'

export const POST = catchAsync(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ postId: string }> },
  ) => {
    await connectDB()

    const guard = requireUser(req)
    if (guard) return guard

    const { postId } = await params
    const { content, parent } = await req.json()

    const comment = await commentService.create(
      req.user!.id,
      postId,
      content,
      parent,
    )

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

    const guard = requireUser(req)
    if (guard) return guard

    const userId = req.user!.id

    const comments = await commentService.list(postId, userId)

    return ApiResponse.success(comments)
  },
)
