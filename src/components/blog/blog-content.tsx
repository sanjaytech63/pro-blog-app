import { Post } from '@/types/post'
import BlogContentClient from './blog-content-client'

interface Category {
  id: string
  name: string
  slug: string
  count: string
}

interface BlogContentProps {
  posts: Post[]
  categories: Category[]
  recentPosts: Post[]
  meta: {
    page: number
    total: number
    limit: number
  }
  activeCategory?: string
}

export default function BlogContent(props: BlogContentProps) {
  return <BlogContentClient {...props} />
}
