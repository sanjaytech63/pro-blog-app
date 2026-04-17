'use client'

import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useDebouncedValue } from '@/hooks/use-debounced-value'

export function BlogSearch() {
  const router = useRouter()

  const [value, setValue] = useState('')
  const debounced = useDebouncedValue(value, 500)

  const lastQueryRef = useRef<string>('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (debounced) {
      params.set('search', debounced)
    } else {
      params.delete('search')
    }

    const qs = params.toString()

    if (lastQueryRef.current === qs) return

    lastQueryRef.current = qs

    router.replace(`/blog${qs ? `?${qs}` : ''}`)
  }, [debounced, router])

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
