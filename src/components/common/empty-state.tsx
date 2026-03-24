import { Users } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
interface EmptyStateProps {
  title?: string
  description?: string
  icon?: LucideIcon
}

export function EmptyState({
  title = 'No data found',
  description = 'There is nothing to show here yet.',
  icon: Icon,
}: EmptyStateProps) {
  return (
    <div className="bg-background flex min-h-55 flex-col items-center justify-center gap-2 rounded-lg border p-6 text-center">
      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
        {Icon ? (
          <Icon className="text-muted-foreground h-6 w-6" />
        ) : (
          <Users className="text-muted-foreground h-6 w-6" />
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  )
}
