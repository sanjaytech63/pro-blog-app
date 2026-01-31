export function parseFormData(formData: FormData): Record<string, unknown> {
  return Object.fromEntries(formData.entries())
}
