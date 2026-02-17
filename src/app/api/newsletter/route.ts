import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { createNewsletterDto } from '@/validators/create-newsletter-schema'
import { newsletterService } from '@/services/newsletter.service'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()

  const body = await req.json()

  const parsed = createNewsletterDto.parse(body)

  const result = await newsletterService.subscribe(parsed.email)

  return ApiResponse.success(result, 'Subscribed successfully')
})
