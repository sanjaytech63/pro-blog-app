import { ZodError } from 'zod'
import ApiError from './ApiError'
import { ApiResponse } from './ApiResponse'

export function handleRouteError(err: unknown) {
  // Domain-specific errors
  if (err instanceof ApiError) {
    return ApiResponse.error(err.message, err.status)
  }

  // Zod schema validation errors
  if (err instanceof ZodError) {
    const formatted = err.issues.map((i) => ({
      path: i.path.join('.'),
      message: i.message,
    }))
    return ApiResponse.error(formatted, 400)
  }

  // Unexpected runtime + internal errors
  if (err instanceof Error) {
    return ApiResponse.error(err.message, 500)
  }

  // Unknown (should rarely happen)
  return ApiResponse.error('Something went wrong', 500)
}
