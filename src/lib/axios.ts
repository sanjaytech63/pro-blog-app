import { env } from '@/config/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.APP_URL || '',
  withCredentials: true,
  timeout: 15000,
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config

    const status = error.response?.status
    const url = original?.url || ''

    const skipRefresh =
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/refresh-token') ||
      url.includes('/auth/logout') ||
      url.includes('/users/me')

    if (status === 401 && !original._retry && !skipRefresh) {
      original._retry = true

      try {
        await api.post('/auth/refresh-token')
        return api(original)
      } catch {
        try {
          await api.post('/auth/logout')
        } catch {}

        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)
