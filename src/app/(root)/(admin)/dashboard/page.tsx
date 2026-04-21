'use client'

import { useDashboard } from '@/hooks/useDashboard'
import { FileText, Folder, Eye, Users, Plus } from 'lucide-react'
import { DashboardSkeleton } from './components/dashboard-skeleton'
import { StatsCard } from './components/stats-card'
import { RecentPosts } from './components/recent-posts'
import { ViewsChart } from './components/views-chart'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { data, isLoading } = useDashboard()
  const router = useRouter()

  if (isLoading) return <DashboardSkeleton />

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Welcome back! Here whats happening.
          </p>
        </div>

        <Button onClick={() => router.push('/dashboard/posts')}>
          <Plus className="mt-1" /> <span> Create New Post</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Posts"
          value={data.stats.totalPosts}
          previousValue={10}
          icon={<FileText />}
        />
        <StatsCard
          title="Categories"
          value={data.stats.totalCategories}
          icon={<Folder />}
          previousValue={10}
        />
        <StatsCard
          title="Total Views"
          value={data.stats.totalViews}
          previousValue={data.stats.totalViews}
          icon={<Eye />}
        />
        <StatsCard
          title="Users"
          value={data.stats.totalUsers}
          icon={<Users />}
          previousValue={10}
        />
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border p-4 lg:col-span-2">
          <h3 className="mb-4 font-semibold">Recent Posts</h3>
          <RecentPosts posts={data.recentPosts} />
        </div>

        <div className="rounded-2xl border p-4">
          <h3 className="mb-4 font-semibold">Post Views</h3>
          <ViewsChart data={data.views} />
        </div>
      </div>
    </div>
  )
}
