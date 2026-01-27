'use client'

import { ActionResult } from '@/types/action'
import { toast } from 'sonner'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export function handleActionResult(
  result: ActionResult,
  router: AppRouterInstance,
) {
  if (!result) return

  if (result.ok) {
    toast.success(result.message)
    if (result.redirectTo) router.push(result.redirectTo)
  } else {
    toast.error(result.message)
  }
}
