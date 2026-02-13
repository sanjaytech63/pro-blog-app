import { githubAuthUrl } from '@/services/oauth.service'

export async function GET(req: Request) {
  const origin = new URL(req.url).origin
  return Response.redirect(githubAuthUrl(origin))
}
