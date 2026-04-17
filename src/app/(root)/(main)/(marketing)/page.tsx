import { Suspense } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import Container from '@/components/container'

import RecentPosts from './components/recent-posts'
import { HeroSection } from './components/hero-section'
import { PostCardSkeleton } from '@/components/blog/post-card-skeleton'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <Container className="py-10">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <Button asChild variant="outline">
            <Link href="/blog">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Suspense fallback={<PostCardSkeleton />}>
          <RecentPosts />
        </Suspense>
      </Container>
    </>
  )
}
