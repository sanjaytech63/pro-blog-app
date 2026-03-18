'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
}

interface CategoryFilterProps {
  categories: Category[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  function handleFilter(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString())

    if (!slug) {
      params.delete('category')
    } else {
      params.set('category', slug)
    }

    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!activeCategory ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleFilter(null)}
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.slug ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilter(category.slug)}
          className={cn(
            'transition-colors',
            activeCategory === category.slug && 'shadow-sm',
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}
