'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface Props {
  title: string
  value: number
  previousValue?: number
  icon?: React.ReactNode
  loading?: boolean
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const formatNumber = (num: number) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num
}

export const StatsCard = ({
  title,
  value,
  previousValue,
  icon,
  variant = 'default',
}: Props) => {
  const hasTrend = previousValue !== undefined && previousValue !== 0

  const percentage = hasTrend
    ? ((value - previousValue!) / previousValue!) * 100
    : 0

  const isPositive = percentage >= 0

  const variantStyles = {
    default: 'bg-muted/40 text-primary',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600',
  }

  return (
    <Card className="rounded-2xl border bg-transparent shadow-sm transition hover:shadow-md">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>

          <h3 className="text-2xl font-semibold">{formatNumber(value)}</h3>

          {hasTrend && (
            <div
              className={cn(
                'mt-1 flex items-center gap-1 text-xs font-medium',
                isPositive ? 'text-green-600' : 'text-red-600',
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {Math.abs(percentage).toFixed(1)}%
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          )}
        </div>

        {icon && (
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl',
              variantStyles[variant],
            )}
          >
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
