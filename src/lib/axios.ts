import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

export const api = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 15000,
})

type FailedRequest = {
  resolve: (value?: AxiosResponse) => void
  reject: (error: unknown) => void
}

let isRefreshing = false
let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error)
    else p.resolve()
  })
  failedQueue = []
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as CustomAxiosRequestConfig
    const status = error.response?.status
    const url = original?.url || ''

    const skipRefresh =
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/refresh-token') ||
      url.includes('/auth/logout')

    if (status === 401 && !original._retry && !skipRefresh) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(original)),
            reject,
          })
        })
      }

      original._retry = true
      isRefreshing = true

      try {
        await api.post('/api/auth/refresh-token')

        processQueue(null)

        return api(original)
      } catch (err) {
        processQueue(err)

        try {
          await api.post('/api/auth/logout')
        } catch {}

        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)
