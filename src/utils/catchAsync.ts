import { NextRequest, NextResponse } from 'next/server'
import { handleRouteError } from './handleError'

export type RouteContext<K extends string = never> = {
  params: Record<K, string>
}

export const catchAsync = <K extends string = never>(
  handler: (
    req: NextRequest,
    context: RouteContext<K>,
  ) => Promise<Response | NextResponse>,
) => {
  return async (req: NextRequest, context: RouteContext<K>) => {
    try {
      return await handler(req, context)
    } catch (err: unknown) {
      return handleRouteError(err)
    }
  }
}
