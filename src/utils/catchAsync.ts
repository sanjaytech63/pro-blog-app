import { NextRequest } from 'next/server'
import { handleRouteError } from './handleError'

export const catchAsync = (
  handler: (req: NextRequest) => Promise<Response>,
) => {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (err: unknown) {
      return handleRouteError(err)
    }
  }
}
