import { googleAuthUrl } from '@/services/oauth.service'

export async function GET() {
  return Response.redirect(googleAuthUrl())
}
