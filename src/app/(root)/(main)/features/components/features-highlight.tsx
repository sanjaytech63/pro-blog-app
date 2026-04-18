'use client'

import Container from '@/components/container'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const highlights = [
  {
    title: 'Write Faster with Powerful Editor',
    desc: 'Create rich content with markdown, media, and code support.',
    points: [
      'Markdown + Rich text support',
      'Live preview',
      'Media & code blocks',
    ],
    image: '/images/feature2.png',
  },
  {
    title: 'Manage Everything in One Dashboard',
    desc: 'Control posts, categories, and users from a clean UI.',
    points: [
      'Post & category management',
      'User roles & permissions',
      'Analytics overview',
    ],
    image: '/images/feature1.png',
  },
]

export function FeaturesHighlight() {
  return (
    <Container className="space-y-24">
      {highlights.map((item, i) => {
        const isReverse = i % 2 !== 0

        return (
          <div key={i} className="grid items-center gap-12 md:grid-cols-2">
            {/* IMAGE */}
            <div className={isReverse ? 'md:order-2' : ''}>
              <div className="group bg-muted/30 relative overflow-hidden rounded-2xl border p-3 shadow-sm transition-all hover:shadow-lg">
                {/* IMAGE */}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={700}
                  height={500}
                  className="rounded-xl object-cover"
                />

                {/* subtle overlay */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
              </div>
            </div>

            {/* TEXT */}
            <div className={isReverse ? 'md:order-1' : ''}>
              <h2 className="text-3xl leading-tight font-bold">{item.title}</h2>

              <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                {item.desc}
              </p>

              {/* FEATURES LIST */}
              <ul className="mt-6 space-y-3">
                {item.points.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <span className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full">
                      <Check className="h-3 w-3" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8">
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
            </div>
          </div>
        )
      })}
    </Container>
  )
}
