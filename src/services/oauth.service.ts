import { env } from '@/config/env'
import qs from 'querystring'

export const googleAuthUrl = (origin: string) =>
  `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: `${origin}/api/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  })}`

export const githubAuthUrl = (origin: string) =>
  `https://github.com/login/oauth/authorize?${qs.stringify({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${origin}/api/auth/github/callback`,
    scope: 'user:email',
  })}`
