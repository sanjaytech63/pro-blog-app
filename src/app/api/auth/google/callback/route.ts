import axios from 'axios'
import crypto from 'crypto'
import { connectDB } from '@/lib/db'
import { User } from '@/models/user.model'
import { signAccessToken, signRefreshToken } from '@/lib/jwt'
import { setAuthCookies } from '@/lib/auth-cookies'
import { env } from '@/config/env'

export async function GET(req: Request) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    return Response.redirect('/login')
  }

  /* ---------- Exchange code for token ---------- */
  const { data: token } = await axios.post(
    'https://oauth2.googleapis.com/token',
    {
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: `${env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`,
      grant_type: 'authorization_code',
    },
  )

  /* ---------- Fetch Google profile ---------- */
  const { data: profile } = await axios.get(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  )

  const email = profile.email.toLowerCase()

  /* ---------- Find user by EMAIL (key fix) ---------- */
  let user = await User.findOne({ email })

  if (!user) {
    // 🟢 First-time Google user
    user = await User.create({
      fullName: profile.name,
      email,
      provider: 'google',
      providerId: profile.id,
      isVerified: true,
      role: 'user',
    })
  } else {
    // 🔵 Existing user → link account if needed
    if (user.provider === 'credentials') {
      user.provider = 'google'
      user.providerId = profile.id
      user.isVerified = true
      await user.save()
    }
  }

  /* ---------- Issue tokens ---------- */
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
