import { api } from '@/lib/axios'
import { ApiResponse } from '@/types/api'
import { Contact, PaginatedContacts } from '@/types/contact'

export interface ListContactsQuery {
  page: number
  limit: number
  search?: string
}

export const contactService = {
  async create(data: {
    fullname: string
    email: string
    subject: string
    message: string
  }): Promise<ApiResponse<Contact>> {
    const res = await api.post('/api/contact', data)
    return res.data
  },

  async list(query: ListContactsQuery): Promise<PaginatedContacts> {
    const res = await api.get('/api/contact', {
      params: query,
    })

    return res.data?.data
  },
}
