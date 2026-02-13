import { googleAuthUrl } from '@/services/oauth.service'
import { catchAsync } from '@/utils/catchAsync'
import { NextRequest } from 'next/server'

export const GET = catchAsync(async (req: NextRequest) => {
  const origin = new URL(req.url).origin
  return Response.redirect(googleAuthUrl(origin))
})
