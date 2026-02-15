import { api } from '@/lib/axios'
import {
  SubscribePayload,
  NewsletterResponse,
  NewsletterListResponse,
} from '@/types/newsletter.types'

export const newsletterService = {
  async subscribe(data: SubscribePayload): Promise<NewsletterResponse> {
    const res = await api.post('/newsletter', data)
    return res.data
  },

  async getSubscribers(params: {
    page: number
    limit: number
    search?: string
  }): Promise<NewsletterListResponse> {
    const res = await api.get<NewsletterListResponse>('/newsletter/admin', {
      params,
    })

    return res.data.data
  },

  async deleteSubscriber(id: string): Promise<NewsletterResponse> {
    const res = await api.delete(`/newsletter/admin/${id}`)
    return res.data
  },

  async unsubscribe(email: string): Promise<NewsletterResponse> {
    const res = await api.patch('/newsletter/unsubscribe', { email })
    return res.data
  },
}
