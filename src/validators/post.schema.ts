import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  coverImageBase64: z.string().default('').optional(),
})

export const updatePostSchema = createPostSchema

export type CreatePostDto = z.infer<typeof createPostSchema>
export type UpdatePostDto = z.infer<typeof updatePostSchema>
