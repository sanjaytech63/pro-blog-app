import { Button } from '@/components/ui/button'
import { Loader } from '../ui/loader'

type Props = {
  label: string
  loading?: boolean
  loadingLabel?: string
}

export function SubmitButton({
  label,
  loading = false,
  loadingLabel = 'Please wait…',
}: Props) {
  return (
    <Button type="submit" disabled={loading} className="w-full cursor-pointer">
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader label={loadingLabel} />
        </span>
      ) : (
        label
      )}
    </Button>
  )
}
