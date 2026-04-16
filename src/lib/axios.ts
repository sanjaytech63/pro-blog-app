import axios from 'axios'

// Use relative URLs by default (same domain in prod)
// Only use absolute URL if environment variable explicitly set for a different domain
export const api = axios.create({
  baseURL: '',
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
        await api.post('/api/auth/refresh-token')
        return api({
          ...original,
          headers: {
            ...original.headers,
          },
          withCredentials: true,
        })
      } catch {
        try {
          await api.post('/api/auth/logout')
        } catch {}

        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)
