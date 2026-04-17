import { env } from '@/config/env'

type GetPostsParams = {
  page?: string
  limit?: string
  search?: string
  status?: string
  category?: string
}

export async function getPosts(params?: GetPostsParams) {
  const query = new URLSearchParams(params as Record<string, string>).toString()

  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/posts${query ? `?${query}` : ''}`,
    {
      next: {
        revalidate: 60,
        tags: ['posts'],
      },
    },
  )

  if (!res.ok) {
    console.error('Failed to fetch posts')
    return null
  }

  const json = await res.json()

  return json?.data ?? null
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
    next: {
      revalidate: 60,
      // tags: ['post', slug],
    },
  })

  if (!res.ok) return null

  const json = await res.json()

  return json?.data ?? null
}
