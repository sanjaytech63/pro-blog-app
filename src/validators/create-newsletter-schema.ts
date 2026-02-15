import { z } from 'zod'

export const createNewsletterDto = z.object({
  email: z.string().email(),
})

export type CreateNewsletterDto = z.infer<typeof createNewsletterDto>
