import 'server-only'
import { cache } from 'react'
import { ListPostsParams } from '../client/post.service'
import { Post } from '@/types/post'

export const getPosts = cache(async (params?: ListPostsParams) => {
  const query = new URLSearchParams(params as Record<string, string>).toString()

  const res = await fetch(`/api/posts?${query}`, {
    next: {
      revalidate: 60,
      tags: ['posts'],
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }

  return res.json()
})

export const getPostBySlug = cache(async (slug: string) => {
  const res = await fetch(`/api/posts/${slug}`, {
    next: {
      revalidate: 60,
      tags: ['post', slug],
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }

  const data = await res.json()

  return data?.data as Post
})
