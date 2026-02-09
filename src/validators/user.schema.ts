import { z } from 'zod'

export const updateProfileSchema = z.object({
  fullName: z.string().min(3).optional(),
  avatar: z.string().url().optional(),
  email: z.string().email('Invalid email'),
})

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>
