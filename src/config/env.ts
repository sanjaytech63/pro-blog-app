export const env = Object.freeze({
  /* ---------- App ---------- */
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  NEXT_PUBLIC_BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',

  /* ---------- Database ---------- */
  MONGO_URI: process.env.MONGO_URI ?? '',

  /* ---------- SMTP ---------- */
  SMTP_HOST: process.env.SMTP_HOST ?? '',
  SMTP_PORT: Number(process.env.SMTP_PORT ?? 465),
  SMTP_EMAIL: process.env.SMTP_EMAIL ?? '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD ?? '',

  /* ---------- JWT (ACCESS) ---------- */
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? '',
  ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES ?? '15m',

  /* ---------- JWT (REFRESH) ---------- */
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? '',
  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES ?? '30d',

  /* ---------- OTP ---------- */
  OTP_EXPIRES_MINUTES: Number(process.env.OTP_EXPIRES_MINUTES ?? 5),
  /* ---------- OAuth ---------- */
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ?? '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ?? '',
})
