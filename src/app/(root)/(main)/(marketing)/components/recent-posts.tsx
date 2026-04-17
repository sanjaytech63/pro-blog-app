import { PostGrid } from '@/components/blog/post-grid'
import { EmptyState } from '@/components/common/empty-state'
import { getPosts } from '@/services/server/post.api'

export default async function RecentPosts() {
  const response = await getPosts({
    limit: '4',
    status: 'PUBLISHED',
  })

  const list = response?.data ?? []

  if (list.length === 0) {
    return <EmptyState title="No recent posts found" />
  }

  return <PostGrid posts={list} />
}
