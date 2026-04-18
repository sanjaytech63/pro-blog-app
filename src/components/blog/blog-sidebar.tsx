import { Post } from '@/types/post'
import { SidebarRecentPosts } from './sidebar-recent-posts'
import { CategoryFilter } from './category-filter'

interface Category {
  id: string
  name: string
  slug: string
  count: string
}

interface BlogSidebarProps {
  categories: Category[]
  recentPosts: Post[]
}

export function BlogSidebar({ recentPosts, categories }: BlogSidebarProps) {
  return (
    <aside className="space-y-6">
      <h3 className="text-lg font-semibold">Category</h3>

      <CategoryFilter categories={categories} />
      <div>
        <h3 className="mb-4 text-lg font-semibold">Recent Posts</h3>
        <SidebarRecentPosts posts={recentPosts ?? []} />
      </div>
    </aside>
  )
}
