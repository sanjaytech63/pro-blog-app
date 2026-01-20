import { z } from 'zod'

// Define schema for server env
const serverSchema = z.object({
  SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
  SMTP_PORT: z.coerce.number().min(1, 'SMTP_PORT must be a number'),
  SMTP_EMAIL: z.string().email('SMTP_EMAIL must be a valid email'),
  SMTP_PASSWORD: z.string().min(1, 'SMTP_PASSWORD is required'),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),

  JWT_EXPIRES_IN: z
    .string()
    .regex(/^\d+(ms|s|m|h|d|w)$/)
    .default('15m'),
  OTP_EXPIRES_MINUTES: z.coerce.number().default(5),

  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

// Define schema for public client env
const clientSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .url('NEXT_PUBLIC_BASE_URL must be a valid URL'),
})

// Validate server env
const _serverEnv = serverSchema.safeParse({
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  OTP_EXPIRES_MINUTES: process.env.OTP_EXPIRES_MINUTES,
  NODE_ENV: process.env.NODE_ENV,
})

if (!_serverEnv.success) {
  console.error(
    '❌ Invalid server environment variables:',
    _serverEnv.error.flatten().fieldErrors,
  )
  throw new Error('Invalid server environment variables. Check your .env file.')
}

// Validate public env (client env)
const _clientEnv = clientSchema.safeParse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
})

if (!_clientEnv.success) {
  console.error(
    '❌ Invalid public environment variables:',
    _clientEnv.error.flatten().fieldErrors,
  )
  throw new Error('Invalid public environment variables. Check your .env file.')
}

// Freeze validated envs
export const env = Object.freeze({
  ..._serverEnv.data,
  ..._clientEnv.data,
})
