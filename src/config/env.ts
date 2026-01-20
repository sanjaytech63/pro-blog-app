export const env = Object.freeze({
  SMTP_HOST: process.env.SMTP_HOST ?? '',
  SMTP_PORT: Number(process.env.SMTP_PORT ?? 465),
  SMTP_EMAIL: process.env.SMTP_EMAIL ?? '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD ?? '',
  MONGO_URI: process.env.MONGO_URI ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '15m',
  OTP_EXPIRES_MINUTES: Number(process.env.OTP_EXPIRES_MINUTES ?? 5),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  NEXT_PUBLIC_BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
})
