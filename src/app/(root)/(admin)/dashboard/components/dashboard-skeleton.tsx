import { Skeleton } from '@/components/ui/skeleton'

export const DashboardSkeleton = () => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>

      <Skeleton className="h-75 rounded-xl" />
    </div>
  )
}
