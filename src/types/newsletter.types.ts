export interface SubscribePayload {
  email: string
}

export interface NewsletterResponse {
  message: string
}

export interface NewsletterSubscriber {
  _id: string
  email: string
  status: 'active' | 'unsubscribed'
  createdAt: string
  updatedAt: string
}

export interface NewsletterListResponse {
  data: NewsletterSubscriber[]
  meta: {
    total: number
    page: number
    limit: number
  }
}
