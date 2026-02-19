import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { postService } from '@/services/post.service'

export const GET = catchAsync(
  async (_: Request, { params }: { params: { slug: string } }) => {
    await connectDB()

    const post = await postService.getBySlug(params.slug)

    return ApiResponse.success(post)
  },
)
