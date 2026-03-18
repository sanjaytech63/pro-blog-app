import { ReactNode, useId } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  const generatedId = useId()

  return (
    <section
      id={id ?? `section-${generatedId}`}
      className={cn('relative py-16 sm:py-20 lg:py-24', className)}
    >
      {children}
    </section>
  )
}
