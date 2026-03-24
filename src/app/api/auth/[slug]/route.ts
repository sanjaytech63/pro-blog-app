import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { postService } from '@/services/post.service'

type RouteContext = {
  params: Promise<{ slug: string }>
}

export const GET = catchAsync(async (_: Request, { params }: RouteContext) => {
  await connectDB()

  const { slug } = await params

  const post = await postService.getBySlug(slug)

  return ApiResponse.success(post)
})
