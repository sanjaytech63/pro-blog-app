import crypto from 'crypto'

export const generateOTP = (): string =>
  crypto.randomInt(100000, 1000000).toString()
