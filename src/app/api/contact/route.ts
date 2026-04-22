import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { contactSchema } from '@/validators/contact.schema'
import { contactService } from '@/services/contact.service'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()

  const { fullname, email, subject, message } = contactSchema.parse(
    await req.json(),
  )

  const result = await contactService.createContact(
    fullname,
    email,
    subject,
    message,
  )

  return ApiResponse.success(result, 'Contact submitted successfully')
})

export const GET = catchAsync(async (req: NextRequest) => {
  await connectDB()

  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const search = searchParams.get('search') || ''

  const contacts = await contactService.getContacts({
    page,
    limit,
    search,
  })

  return ApiResponse.success(contacts)
})
