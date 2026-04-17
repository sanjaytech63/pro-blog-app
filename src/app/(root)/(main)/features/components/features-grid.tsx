'use client'

import Container from '@/components/container'
import { FEATURES } from './features-data'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/common/section'

export function FeaturesGrid() {
  return (
    <Section className="feature-gird-sections">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon

            return (
              <Card
                key={index}
                className="group bg-background rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="space-y-4 p-0">
                  <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  <h3 className="text-lg font-semibold">{feature.title}</h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
