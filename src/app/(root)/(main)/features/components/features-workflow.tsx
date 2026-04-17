'use client'

import { Section } from '@/components/common/section'
import Container from '@/components/container'
import { PenTool, Rocket, CheckCircle } from 'lucide-react'

const steps = [
  {
    title: 'Create',
    desc: 'Write and format your blog content easily with powerful tools.',
    icon: PenTool,
  },
  {
    title: 'Publish',
    desc: 'Make your content live instantly with optimized delivery.',
    icon: CheckCircle,
  },
  {
    title: 'Scale',
    desc: 'Reach more users with performance and SEO optimization.',
    icon: Rocket,
  },
]

export function FeaturesWorkflow() {
  return (
    <Section id="feaure-work-flow">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Simple Workflow</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl">
            Build, publish, and scale your blog effortlessly in minutes.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="bg-border absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-1/2 md:block" />

          {steps.map((step, i) => {
            const Icon = step.icon

            return (
              <div
                key={i}
                className="group bg-background relative z-10 rounded-2xl border p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="bg-primary/10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" />
                </div>

                <div className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider">
                  STEP {i + 1}
                </div>

                <h3 className="text-lg font-semibold">{step.title}</h3>

                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {step.desc}
                </p>

                <div className="from-primary/10 to-smoke-500/10 pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
