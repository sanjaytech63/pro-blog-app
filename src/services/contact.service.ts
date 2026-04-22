import Contact from '@/models/contact.model'
import ApiError from '@/utils/ApiError'

interface ContactQuery {
  page?: number
  limit?: number
  search?: string
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>
}

class ContactService {
  async createContact(
    fullname: string,
    email: string,
    subject: string,
    message: string,
  ) {
    const normalizedEmail = email.trim().toLowerCase()
    const contact = await Contact.create({
      fullname,
      email: normalizedEmail,
      subject,
      message,
    })

    return contact
  }

  async getContacts({
    page = 1,
    limit = 10,
    search,
  }: {
    page: number
    limit: number
    search: string
  }) {
    if (page < 1 || limit < 1) {
      throw new ApiError(400, 'Invalid pagination params')
    }

    const skip = (page - 1) * limit

    const filter: ContactQuery = {}

    if (search) {
      filter.$or = [
        { fullname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ]
    }

    const [data, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Contact.countDocuments(filter),
    ])

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }
}

export const contactService = new ContactService()
