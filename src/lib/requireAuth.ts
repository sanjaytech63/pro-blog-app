import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/jwt'

export async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) {
    throw new Error('Unauthorized')
  }

  return verifyAccessToken(token)
}
