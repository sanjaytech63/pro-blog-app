export const dynamic = 'force-dynamic'
import 'server-only'
import { cache } from 'react'
import { ListPostsParams } from '../client/post.service'
import { env } from '@/config/env'
import { Post } from '@/types/post'

export const getPosts = cache(async (params?: ListPostsParams) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params || {}).filter(([_, v]) => v !== undefined),
  )

  const query = new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString()

  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts?${query}`, {
    cache: 'no-store',
    next: {
      // revalidate: 60,
      tags: ['posts'],
    },
  })

  if (!res.ok) {
    console.error('Failed to fetch posts:', res.status, res.statusText)
    return {
      success: true,
      message: '',
      data: { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } },
    }
  }

  return res.json()
})

export const getPostBySlug = cache(async (slug: string) => {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
    cache: 'no-store',
    next: {
      // revalidate: 60,
      tags: ['post', slug],
    },
  })

  if (!res.ok) {
    return null
  }

  const data = await res.json()

  return data?.data as Post
})
