'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { Button } from '@/components/ui/button'
import { PostStatus } from '@/types/post'

interface Filters {
  search?: string
  status?: PostStatus
  category?: string
}

interface Props {
  onChange: (filters: Filters) => void
}

export default function PostFilters({ onChange }: Props) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<PostStatus | undefined>()
  const [category, setCategory] = useState('')

  const debouncedSearch = useDebouncedValue(search, 500)
  const debouncedCategory = useDebouncedValue(category, 500)

  const filters = useMemo<Filters>(() => {
    return {
      search: debouncedSearch.trim() || undefined,
      status,
      category: debouncedCategory.trim() || undefined,
    }
  }, [debouncedSearch, status, debouncedCategory])

  useEffect(() => {
    onChange(filters)
  }, [filters, onChange])

  const clearFilters = () => {
    setSearch('')
    setStatus(undefined)
    setCategory('')
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
      <div className="relative w-full md:w-64">
        <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
        <Input
          placeholder="Search posts..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Select
        value={status}
        onValueChange={(val) => setStatus(val as PostStatus)}
      >
        <SelectTrigger className="w-full md:w-44">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="DRAFT">Draft</SelectItem>
          <SelectItem value="PUBLISHED">Published</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Category"
        className="w-full md:w-44"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <Button
        type="button"
        variant="ghost"
        onClick={clearFilters}
        className="group hover:bg-destructive/10 hover:text-destructive flex cursor-pointer items-center gap-2 px-4 transition-all"
      >
        <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
        Reset
      </Button>
    </div>
  )
}
