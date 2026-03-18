import { Card, CardContent } from '@/components/ui/card'

const SKELETON_COUNT = 6

export function PostCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(SKELETON_COUNT)].map((_, index) => (
        <Card
          key={`post-skeleton-${index}`}
          className="overflow-hidden rounded-2xl pt-0"
        >
          <div className="bg-muted h-52 w-full animate-pulse" />

          <CardContent className="space-y-3 p-6">
            <div className="bg-muted h-3 w-24 animate-pulse rounded" />
            <div className="bg-muted h-5 w-3/4 animate-pulse rounded" />
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-2/3 animate-pulse rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
