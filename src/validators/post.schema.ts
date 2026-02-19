import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(50),
  excerpt: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  coverImageBase64: z.string().optional(),
})

export const updatePostSchema = createPostSchema.partial()

export type CreatePostDto = z.infer<typeof createPostSchema>
export type UpdatePostDto = z.infer<typeof updatePostSchema>
