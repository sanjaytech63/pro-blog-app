export function getIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const cloudflareIp = req.headers.get('cf-connecting-ip')
  if (cloudflareIp) {
    return cloudflareIp
  }

  const realIp = req.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  return 'unknown'
}
