import axios from 'axios'
import crypto from 'crypto'
import { connectDB } from '@/lib/db'
import { User } from '@/models/user.model'
import { signAccessToken, signRefreshToken } from '@/lib/jwt'
import { setAuthCookies } from '@/lib/auth-cookies'
import { env } from '@/config/env'

interface GitHubEmail {
  email: string
  primary: boolean
  verified: boolean
  visibility: 'public' | 'private' | null
}

export async function GET(req: Request) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    return Response.redirect('/login')
  }

  /* ---------- Exchange code for access token ---------- */
  const { data: token } = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    },
  )

  const accessTokenGithub = token.access_token

  /* ---------- Fetch GitHub profile ---------- */
  const { data: profile } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessTokenGithub}`,
    },
  })

  /* ---------- Fetch primary email (CRITICAL) ---------- */
  const { data: emails } = await axios.get<GitHubEmail[]>(
    'https://api.github.com/user/emails',
    {
      headers: {
        Authorization: `Bearer ${accessTokenGithub}`,
      },
    },
  )

  const primaryEmailObj = emails.find((e) => e.primary && e.verified)
  if (!primaryEmailObj) {
    return Response.redirect('/login')
  }

  const email = primaryEmailObj.email.toLowerCase()

  /* ---------- Find or link user by email ---------- */
  let user = await User.findOne({ email })

  if (!user) {
    // 🟢 First-time GitHub user
    user = await User.create({
      fullName: profile.name || profile.login,
      email,
      provider: 'github',
      providerId: profile.id.toString(),
      isVerified: true,
      role: 'user',
    })
  } else {
    // 🔵 Link credentials → github
    if (user.provider === 'credentials') {
      user.provider = 'github'
      user.providerId = profile.id.toString()
      user.isVerified = true
      await user.save()
    }
  }

  /* ---------- Issue JWT tokens ---------- */
  const accessToken = signAccessToken({
    id: user._id.toString(),
    role: user.role,
  })

  const refreshToken = signRefreshToken({
    id: user._id.toString(),
  })

  user.refreshToken = crypto
    .createHash('sha256')
    .update(refreshToken)
    .digest('hex')

  user.refreshTokenExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  await user.save()

  /* ---------- Set cookies & redirect ---------- */
  await setAuthCookies(accessToken, refreshToken)

  return Response.redirect(env.NEXT_PUBLIC_BASE_URL)
}
