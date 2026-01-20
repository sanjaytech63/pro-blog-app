import ApiError from './ApiError'
import { ApiResponse } from './ApiResponse'

export function handleRouteError(err: unknown) {
  // Custom domain error
  if (err instanceof ApiError) {
    return ApiResponse.error(err.message, err.status)
  }

  // Built-in JS errors (Mongoose, JWT, etc.)
  if (err instanceof Error) {
    return ApiResponse.error(err.message, 500)
  }

  // Unknown untyped errors
  return ApiResponse.error('Something went wrong', 500)
}
