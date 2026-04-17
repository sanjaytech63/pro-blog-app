'use client'

import { useCounter } from '@/hooks/use-counter'
import { StatItem } from '@/types/feature'

export function StatCard({ item }: { item: StatItem }) {
  const count = useCounter(item.value)
  const Icon = item.icon

  return (
    <div className="group bg-background relative rounded-2xl border p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>

      <div className="text-primary text-3xl font-bold">
        {item.value === 99.9 ? count.toFixed(1) : Math.floor(count)}
        {item.suffix}
      </div>

      <p className="text-muted-foreground mt-2 text-sm">{item.label}</p>

      <div className="from-primary/10 to-smoke-500/10 pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}
