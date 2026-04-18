'use client'

import Image from 'next/image'
import { Section } from '../common/section'
import Container from '../container'

interface BlogHeroProps {
  title?: string
  description?: string
}

export function BlogHero({
  description = 'Deep technical articles on architecture, performance and production engineering.',
}: BlogHeroProps) {
  return (
    <Section
      id="blog-list"
      className="relative mt-16 flex min-h-[50vh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/main-img.png"
          alt="Blog background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/50 to-black/80" />

      <Container className="relative text-center text-white">
        <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs backdrop-blur">
          🚀 Engineering Blog
        </div>

        <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-6xl md:text-7xl">
          Blog <span className="text-red-600">& </span> Insights
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {description}
        </p>
      </Container>
    </Section>
  )
}
