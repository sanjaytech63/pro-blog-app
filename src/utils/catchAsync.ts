import { NextRequest, NextResponse } from 'next/server'
import { handleRouteError } from './handleError'

export function catchAsync<TContext = unknown>(
  handler: (
    req: NextRequest,
    context: TContext,
  ) => Promise<Response | NextResponse>,
) {
  return async (req: NextRequest, context: TContext) => {
    try {
      return await handler(req, context)
    } catch (err: unknown) {
      return handleRouteError(err)
    }
  }
}
