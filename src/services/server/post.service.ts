export const dynamic = 'force-dynamic'
import 'server-only'
import { cache } from 'react'
import { ListPostsParams } from '../client/post.service'
import { env } from '@/config/env'
import { Post } from '@/types/post'
// const baseUrl = env.APP_URL

export const getPosts = cache(async (params?: ListPostsParams) => {
  console.log('env:', env.APP_URL)
  const filteredParams = Object.fromEntries(
    Object.entries(params || {}).filter(([_, v]) => v !== undefined),
  )

  const query = new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString()

  const res = await fetch(`http://localhost:3000/api/posts?${query}`, {
    cache: 'no-store',
    next: {
      // revalidate: 60,
      tags: ['posts'],
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }

  return res.json()
})

export const getPostBySlug = cache(async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
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
