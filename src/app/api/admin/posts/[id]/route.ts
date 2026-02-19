import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { updatePostSchema } from '@/validators/post.schema'
import { postService } from '@/services/post.service'
import { requireAdminUser } from '@/middlewares/guards'
import { NextRequest } from 'next/server'

export const PUT = catchAsync(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB()

    const guard = await requireAdminUser(req)
    if (guard) return guard

    const { id } = await params

    const dto = updatePostSchema.parse(await req.json())

    const post = await postService.update(id, dto)

    return ApiResponse.success(post, 'Post updated successfully')
  },
)

export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB()

    const guard = await requireAdminUser(req)
    if (guard) return guard

    const { id } = await params

    await postService.softDelete(id, req.user!.id)

    return ApiResponse.success(null, 'Post deleted successfully')
  },
)
