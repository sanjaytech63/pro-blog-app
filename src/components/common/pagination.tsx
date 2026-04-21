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
  const safePage = Number.isFinite(page) && page > 0 ? page : 1
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10
  const safeTotal = Number.isFinite(total) && total >= 0 ? total : 0

  const totalPages = Math.max(1, Math.ceil(safeTotal / safeLimit))

  const pages = getPaginationRange({
    page: safePage,
    totalPages,
    siblingCount,
  }).filter((p) => p === 'dots' || Number.isFinite(p))

  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math?.max(safePage - 1, 1))}
            aria-disabled={safePage === 1}
            className={safePage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {/* Pages */}
        {pages &&
          pages?.map((p, index) =>
            p === 'dots' ? (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === safePage}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math?.min(safePage + 1, totalPages))}
            aria-disabled={safePage === totalPages}
            className={
              safePage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  )
}
