type PaginationRangeParams = {
  page: number
  totalPages: number
  siblingCount: number
}

export function getPaginationRange({
  page,
  totalPages,
  siblingCount,
}: PaginationRangeParams): (number | 'dots')[] {
  const totalNumbers = siblingCount * 2 + 5

  if (totalPages <= totalNumbers) {
    return range(1, totalPages)
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1)
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages)

  const showLeftDots = leftSiblingIndex > 2
  const showRightDots = rightSiblingIndex < totalPages - 1

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + siblingCount * 2), 'dots', totalPages]
  }

  if (showLeftDots && !showRightDots) {
    return [
      1,
      'dots',
      ...range(totalPages - (2 + siblingCount * 2), totalPages),
    ]
  }

  return [
    1,
    'dots',
    ...range(leftSiblingIndex, rightSiblingIndex),
    'dots',
    totalPages,
  ]
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start)
}
