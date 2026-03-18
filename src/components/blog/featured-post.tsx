import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types/blog'
import { Card } from '@/components/ui/card'

interface FeaturedPostProps {
  post: Post
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Card className="group grid overflow-hidden rounded-2xl lg:grid-cols-2">
      <div className="relative h-72 lg:h-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center p-8">
        <p className="text-muted-foreground text-sm">
          {post.category.name} • {post.readingTime}
        </p>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="hover:text-primary mt-3 text-2xl font-bold transition">
            {post.title}
          </h2>
        </Link>

        <p className="text-muted-foreground mt-4">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="text-primary mt-6 inline-block text-sm font-semibold"
        >
          Read Article →
        </Link>
      </div>
    </Card>
  )
}
