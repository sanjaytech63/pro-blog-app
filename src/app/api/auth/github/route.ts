import { githubAuthUrl } from '@/services/oauth.service'

export async function GET() {
  return Response.redirect(githubAuthUrl())
}
