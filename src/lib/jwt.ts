import jwt, { SignOptions, Secret } from 'jsonwebtoken'
import { env } from '@/config/env'

/* ---------- Payload Types ---------- */
export type AccessTokenPayload = {
  id: string
  role: 'user' | 'admin'
}

export type RefreshTokenPayload = {
  id: string
}

/* ---------- Sign Tokens ---------- */
export const signAccessToken = (payload: AccessTokenPayload): string => {
  const secret = env.JWT_ACCESS_SECRET as Secret

  const options: SignOptions = {
    expiresIn: Number(env.ACCESS_TOKEN_EXPIRES) || '15m',
  }

  return jwt.sign(payload, secret, options)
}

export const signRefreshToken = (payload: RefreshTokenPayload): string => {
  const secret = env.JWT_REFRESH_SECRET as Secret

  const options: SignOptions = {
    expiresIn: Number(env.REFRESH_TOKEN_EXPIRES) || '30d',
  }

  return jwt.sign(payload, secret, options)
}

/* ---------- Verify Tokens ---------- */
export const verifyAccessToken = <T>(token: string): T => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET as Secret) as T
}

export const verifyRefreshToken = <T>(token: string): T => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET as Secret) as T
}
