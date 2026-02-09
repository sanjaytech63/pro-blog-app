export function logRedirect(from: string, to: string, reason: string) {
  if (process.env.NODE_ENV === 'production') {
    console.info(`[REDIRECT] ${from} → ${to} | reason=${reason}`)
  }
}
