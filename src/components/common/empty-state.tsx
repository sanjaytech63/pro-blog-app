import { Users } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No data found',
  description = 'There is nothing to show here yet.',
}: EmptyStateProps) {
  return (
    <div className="bg-background flex min-h-55 flex-col items-center justify-center gap-4 rounded-lg border p-6 text-center">
      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
        <Users className="text-muted-foreground h-6 w-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  )
}
