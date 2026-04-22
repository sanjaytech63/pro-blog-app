import { z } from 'zod'

export const contactSchema = z.object({
  fullname: z.string().min(2, 'Fullname is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
