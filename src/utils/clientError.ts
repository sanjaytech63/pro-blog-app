import { toast } from 'sonner'

type ClientErrorInput = unknown | Error | { message?: string } | string

/**
 * Normalizes any error coming from Server Actions / APIs
 * and shows a safe toast message on the client.
 */
export function clientError(
  err: ClientErrorInput,
  fallback = 'Something went wrong. Please try again.',
) {
  // Standard JS Error (most Server Action errors)
  if (err instanceof Error) {
    toast.error(err.message || fallback)
    return
  }

  // String errors (edge cases)
  if (typeof err === 'string') {
    toast.error(err)
    return
  }

  // Unknown shape → safe fallback
  toast.error(fallback)
}
