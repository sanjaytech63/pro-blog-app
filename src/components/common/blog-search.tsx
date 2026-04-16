'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useDebouncedValue } from '@/hooks/use-debounced-value'

export function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [value, setValue] = useState(searchParams.get('search') || '')
  const debounced = useDebouncedValue(value, 500)

  useEffect(() => {
    const params = new URLSearchParams(
      typeof window !== 'undefined'
        ? window.location.search
        : searchParams.toString(),
    )

    if (debounced) {
      params.set('search', debounced)
    } else {
      params.delete('search')
    }

    const qs = params.toString()
    router.push(`/blog${qs ? `?${qs}` : ''}`)
  }, [debounced, router, searchParams])

  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
      <Input
        placeholder="Search blog..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}
