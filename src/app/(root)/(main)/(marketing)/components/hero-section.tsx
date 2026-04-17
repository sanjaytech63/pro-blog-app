'use client'

import { Section } from '@/components/common/section'
import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <Section
      id="hero-main-page"
      className="relative mt-16 flex min-h-[50vh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/main-img.png"
          alt="BlogMint Platform"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/50 to-black/80" />

      <Container className="relative text-center text-white">
        <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs backdrop-blur">
          🚀 Modern Publishing Platform
        </div>

        <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-6xl md:text-7xl">
          Build. Publish. <span className="text-red-600">Scale</span> with
          BlogMint.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          A modern publishing platform for creators and developers.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button
            asChild
            size="lg"
            variant="destructive"
            className="bg-red-600!"
          >
            <Link href="/blog">Explore Articles</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent"
          >
            <Link href="/blog" className="flex items-center gap-2">
              Learn More
              <ArrowRight className="mt-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
