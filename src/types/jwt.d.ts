export type AccessTokenPayload = {
  id: string
  role: 'user' | 'admin'
  iat: number
  exp: number
}

export type RefreshTokenPayload = {
  id: string
  iat: number
  exp: number
}
