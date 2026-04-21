import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { commentService } from '@/services/comment.service'
import { requireUser } from '@/middlewares/guards'

export const DELETE = catchAsync(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ commentId: string }> },
  ) => {
    await connectDB()

    const guard = requireUser(req)
    if (guard) return guard

    const { commentId } = await params

    await commentService.delete(req.user!.id, commentId)

    return ApiResponse.success(true, 'Comment deleted')
  },
)
