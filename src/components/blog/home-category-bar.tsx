'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Category {
  id: string
  slug: string
  name: string
}

interface Props {
  categories: Category[]
}

export function HomeCategoryBar({ categories }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const active = searchParams.get('category')

  const handleClick = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (!slug) {
      params.delete('category')
    } else {
      params.set('category', slug)
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
      <Button
        size="sm"
        variant={!active ? 'default' : 'outline'}
        onClick={() => handleClick()}
      >
        All
      </Button>

      {categories.map((cat) => (
        <Button
          key={cat.id}
          size="sm"
          variant={active === cat.slug ? 'default' : 'outline'}
          onClick={() => handleClick(cat.slug)}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  )
}
