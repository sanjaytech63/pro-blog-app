const requiredEnv = (key: string, value?: string) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export const env = Object.freeze({
  NODE_ENV: process.env.NODE_ENV ?? 'development',

  APP_URL: process.env.APP_URL ?? 'http://localhost:3000',

  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL ??
    'https://main.d32qgf9c245560.amplifyapp.com',

  /* ---------- Database ---------- */
  MONGO_URI: requiredEnv('MONGO_URI', process.env.MONGO_URI),

  /* ---------- SMTP ---------- */
  SMTP_HOST: process.env.SMTP_HOST ?? '',
  SMTP_PORT: Number(process.env.SMTP_PORT ?? 465),
  SMTP_EMAIL: process.env.SMTP_EMAIL ?? '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD ?? '',

  /* ---------- JWT ---------- */
  JWT_SECRET: requiredEnv('JWT_SECRET', process.env.JWT_SECRET),

  JWT_ACCESS_SECRET: requiredEnv(
    'JWT_ACCESS_SECRET',
    process.env.JWT_ACCESS_SECRET,
  ),

  JWT_REFRESH_SECRET: requiredEnv(
    'JWT_REFRESH_SECRET',
    process.env.JWT_REFRESH_SECRET,
  ),

  ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES ?? '15m',

  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES ?? '30d',

  /* ---------- OTP ---------- */
  OTP_EXPIRES_MINUTES: Number(process.env.OTP_EXPIRES_MINUTES ?? 5),

  /* ---------- OAuth ---------- */
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ?? '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ?? '',

  /* ---------- Cloudinary ---------- */
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? '',

  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? '',

  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? '',

  /* ---------- Redis ---------- */
  REDIS_URL: process.env.REDIS_URL ?? '',
})
