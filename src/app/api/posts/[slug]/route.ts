import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { postService } from '@/services/post.service'

export const GET = catchAsync(
  async (req: Request, { params }: { params: Promise<{ slug: string }> }) => {
    await connectDB()

    const { slug } = await params

    const post = await postService.getBySlug(slug)

    if (!post) {
      throw new Error('Post not found')
    }

    return ApiResponse.success(post)
  },
)
