import { ActionResult } from '@/types/action'

function getFieldErrors(state: ActionResult) {
  return state && state.ok === false ? state.fieldErrors : undefined
}
export { getFieldErrors }
