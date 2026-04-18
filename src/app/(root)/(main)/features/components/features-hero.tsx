import { Section } from '@/components/common/section'
import Container from '@/components/container'
import Image from 'next/image'

export function FeaturesHero() {
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
          🚀 Features
        </div>

        <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-6xl md:text-7xl">
          Powerful <span className="text-red-600">Features</span> for Modern
          Blogging
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          Everything you need to write, publish, and scale your content — built
          with performance and real-world use in mind.
        </p>
      </Container>
    </Section>
  )
}
