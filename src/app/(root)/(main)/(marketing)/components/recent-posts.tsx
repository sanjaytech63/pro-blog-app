import { getPosts } from '@/services/server/post.service'
import { PostGrid } from '@/components/blog/post-grid'
import { EmptyState } from '@/components/common/empty-state'

export default async function RecentPosts() {
  const posts = await getPosts()

  const list = posts?.data?.data ?? []

  if (!list.length) {
    return <EmptyState />
  }

  return <PostGrid posts={list} />
}
