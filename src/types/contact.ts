export interface Contact {
  _id: string
  fullname: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export interface PaginatedContacts {
  data: Contact[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
