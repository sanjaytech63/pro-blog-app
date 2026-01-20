import 'next/server'
import { DecodedToken } from './jwt'

declare module 'next/server' {
  interface NextRequest {
    user?: DecodedToken
  }
}
