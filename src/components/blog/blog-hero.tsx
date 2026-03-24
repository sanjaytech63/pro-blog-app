import Container from '../container'

interface BlogHeroProps {
  title?: string
  description?: string
}

export function BlogHero({
  title = 'Blog & Insights',
  description = 'Deep technical articles on architecture, performance and production engineering.',
}: BlogHeroProps) {
  return (
    <div className="border-b">
      <Container className="pt-4 pb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>

        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl">
          {description}
        </p>
      </Container>
    </div>
  )
}
