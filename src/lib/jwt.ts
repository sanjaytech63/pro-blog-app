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
  return jwt.sign(payload, env.JWT_ACCESS_SECRET as Secret, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES as SignOptions['expiresIn'],
  })
}

export const signRefreshToken = (payload: RefreshTokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET as Secret, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES as SignOptions['expiresIn'],
  })
}

/* ---------- Verify Tokens ---------- */
export const verifyAccessToken = <T>(token: string): T => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET as Secret) as T
}

export const verifyRefreshToken = <T>(token: string): T => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET as Secret) as T
}
