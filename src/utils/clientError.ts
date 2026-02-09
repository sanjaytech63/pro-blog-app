import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function clientError(error: unknown, fallback = 'Something went wrong') {
  // Axios error
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message || fallback

    toast.error(message)
    return
  }

  // Generic error
  if (error instanceof Error) {
    toast.error(error.message)
    return
  }

  toast.error(fallback)
}
