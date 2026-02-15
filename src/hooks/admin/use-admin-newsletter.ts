import { useQuery } from '@tanstack/react-query'
import { newsletterService } from '@/services/client/newsletter.client.service'

interface Params {
  page: number
  limit: number
  search?: string
}

import type { NewsletterListResponse } from '@/types/newsletter.types'

export function useAdminNewsletter(params: Params) {
  return useQuery<NewsletterListResponse>({
    queryKey: ['admin-newsletter', params],
    queryFn: () => newsletterService.getSubscribers(params),
    placeholderData: (previousData) => previousData,
  })
}
