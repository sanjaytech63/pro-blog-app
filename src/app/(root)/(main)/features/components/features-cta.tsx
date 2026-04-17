'use client'

import { Section } from '@/components/common/section'
import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function FeaturesCTA() {
  return (
    <Section className="group relative overflow-hidden py-20">
      <div className="from-primary/5 to-smoke-500/10 pointer-events-none absolute inset-0 bg-linear-to-r opacity-100 transition-opacity duration-300" />
      <Container className="text-center text-white">
        <h2 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">
          Ready to start blogging?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base text-white/80 md:text-lg">
          Join BlogMint and start publishing powerful content in minutes.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            variant="destructive"
            className="bg-red-600!"
          >
            <Link href="/blog"> Get Started</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent"
          >
            <Link href="/blog" className="flex items-center gap-2">
              Explore Features
              <ArrowRight className="mt-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="mt-6 text-xs text-white/60">
          No credit card required • Free plan available
        </p>
      </Container>
    </Section>
  )
}
