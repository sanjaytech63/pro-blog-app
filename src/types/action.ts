export type ActionResult =
  | {
      ok: true
      message: string
      redirectTo?: string
    }
  | {
      ok: false
      message: string
      fieldErrors?: Record<string, string>
    }
  | null
