export const buildQueryParams = (params: Record<string, unknown>) => {
  const query: Record<string, unknown> = {}

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query[key] = value
    }
  })

  return query
}
