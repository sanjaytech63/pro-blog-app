import { Input } from '@/components/ui/input'
import { FieldError } from 'react-hook-form'

export function FormField({
  error,
  ...props
}: {
  error?: FieldError
} & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1">
      <Input {...props} />
      {error && <p className="text-destructive text-sm">{error.message}</p>}
    </div>
  )
}
