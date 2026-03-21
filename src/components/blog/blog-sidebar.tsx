import { Post } from '@/types/post'
import { CategoryFilter } from './category-filter'
import { SidebarRecentPosts } from './sidebar-recent-posts'

interface Category {
  id: string
  name: string
  slug: string
}

interface BlogSidebarProps {
  categories: Category[]
  recentPosts: Post[]
}

export function BlogSidebar({ categories, recentPosts }: BlogSidebarProps) {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <CategoryFilter categories={categories} />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Recent Posts</h3>
        <SidebarRecentPosts posts={recentPosts ?? []} />
      </div>
    </aside>
  )
}
