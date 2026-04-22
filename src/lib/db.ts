import mongoose from 'mongoose'
import { env } from '../config/env'

let isConnected = false

export async function connectDB() {
  if (isConnected) return

  if (!env.MONGO_URI) {
    const msg = 'MONGO_URI is not set. Set MONGO_URI in environment variables.'
    console.error(msg)
    throw new Error(msg)
  }

  const conn = await mongoose.connect(env.MONGO_URI as string)
  isConnected = !!conn.connections[0].readyState
  console.log('MongoDB Connected')
}
