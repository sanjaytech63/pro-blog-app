export function parseFormData<T>(formData: FormData): Record<string, unknown> {
  return Object.fromEntries(formData.entries())
}
