'use client'

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { getPaginationRange } from './pagination.utils'

interface Props {
  page: number
  total: number
  limit: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

export function Pagination({
  page,
  total,
  limit,
  onPageChange,
  siblingCount = 1,
}: Props) {
  const totalPages = Math.ceil(total / limit)

  const pages = getPaginationRange({
    page,
    totalPages,
    siblingCount,
  })

  return (
    <UIPagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            aria-disabled={page === 1}
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pages.map((p, index) =>
          p === 'dots' ? (
            <PaginationItem key={`dots-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => onPageChange(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
            aria-disabled={page === totalPages}
            className={
              page === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  )
}
