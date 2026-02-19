import { Input } from '@/components/ui/input'
import { FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { useId } from 'react'

interface Props extends React.ComponentProps<typeof Input> {
  label?: string
  error?: FieldError
  required?: boolean
}

export function FormField({
  label,
  error,
  required,
  className,
  id,
  ...props
}: Props) {
  const generatedId = useId()
  const inputId = id || generatedId

  return (
    <div className="">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <Input
        id={inputId}
        aria-invalid={!!error}
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          className,
        )}
        {...props}
      />

      {error && (
        <p className="text-destructive animate-in fade-in-50 text-sm">
          {error.message}
        </p>
      )}
    </div>
  )
}
