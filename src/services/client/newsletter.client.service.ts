import { api } from '@/lib/axios'
import {
  SubscribePayload,
  NewsletterResponse,
  NewsletterListResponse,
} from '@/types/newsletter.types'

export const newsletterService = {
  async subscribe(data: SubscribePayload): Promise<NewsletterResponse> {
    const res = await api.post('/api/newsletter', data)
    return res.data
  },

  async getSubscribers(params: {
    page: number
    limit: number
    search?: string
  }): Promise<NewsletterListResponse> {
    const res = await api.get<{ data: NewsletterListResponse }>(
      '/api/newsletter/admin',
      { params },
    )

    return res.data.data
  },

  async deleteSubscriber(id: string): Promise<NewsletterResponse> {
    const res = await api.delete(`/api/newsletter/admin/${id}`)
    return res.data
  },

  async unsubscribe(email: string): Promise<NewsletterResponse> {
    const res = await api.patch('/api/newsletter/unsubscribe', { email })
    return res.data
  },
}
