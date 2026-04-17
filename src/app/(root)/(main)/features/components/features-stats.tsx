'use client'

import Container from '@/components/container'
import { FileText, Users, ShieldCheck } from 'lucide-react'
import { StatCard } from './StatCard'
import { StatItem } from '@/types/feature'

const stats: StatItem[] = [
  {
    value: 10000,
    label: 'Articles Published',
    suffix: '+',
    icon: FileText,
  },
  {
    value: 5000,
    label: 'Active Users',
    suffix: '+',
    icon: Users,
  },
  {
    value: 99.9,
    label: 'Uptime',
    suffix: '%',
    icon: ShieldCheck,
  },
]

export function FeaturesStats() {
  return (
    <Container className="pb-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Trusted by Developers
        </h2>
        <p className="text-muted-foreground mt-3">
          Powering modern publishing experiences worldwide.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats?.map((item, i) => (
          <StatCard key={i} item={item} />
        ))}
      </div>
    </Container>
  )
}
