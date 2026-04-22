import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'
import { contactSchema } from '@/validators/contact.schema'
import { contactService } from '@/services/contact.service'
import ApiError from '@/utils/ApiError'

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

export const GET = catchAsync(async () => {
  await connectDB()

  const contacts = await contactService.getContacts()

  if (!contacts) throw new ApiError(404, 'Contacts not found')

  return ApiResponse.success(contacts)
})
