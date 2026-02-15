import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { newsletterService } from '@/services/newsletter.service'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'

export const PATCH = catchAsync(async (req: NextRequest) => {
  await connectDB()

  const { email } = await req.json()

  const result = await newsletterService.unsubscribe(email)

  return ApiResponse.success(result, 'unbscribed successfully')
})
