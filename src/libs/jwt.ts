import jwt, { SignOptions, Secret } from 'jsonwebtoken'
import { env } from '@/src/config/env'

export const signToken = (payload: object): string => {
  const secret = env.JWT_SECRET as Secret

  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  }

  return jwt.sign(payload, secret, options)
}
