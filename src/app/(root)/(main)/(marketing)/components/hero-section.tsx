import { Section } from '@/components/common/section'
import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <Section className="relative mt-16 overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero2.jpg"
          alt="BlogMint Publishing Platform"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-black/80 dark:bg-black/90" />

      <Container className="relative text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Build. Publish. Scale with BlogMint.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-white/80">
          A modern publishing platform for creators and developers.
        </p>

        <div className="mt-8">
          <Button asChild size="lg" variant="destructive">
            <Link href="/blog">Explore Articles</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
