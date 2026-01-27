import { ActionResult } from '@/types/action'
import { toast } from 'sonner'

export function handleAuthResult(result: ActionResult) {
  if (!result) return

  if (result.ok) {
    toast.success(result.message)
  } else {
    toast.error(result.message)
  }
}
