import mongoose from 'mongoose'
import { env } from '../config/env'

let isConnected = false

export async function connectDB() {
  if (isConnected) return

  const conn = await mongoose.connect(env.MONGO_URI)
  isConnected = !!conn.connections[0].readyState
  console.log('MongoDB Connected')
}
