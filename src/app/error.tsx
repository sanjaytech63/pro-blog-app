'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset?: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-lg font-semibold text-red-600">
        Something went wrong: {error.message}
      </h2>

      {reset && (
        <button
          onClick={() => reset()}
          className="mt-4 rounded border px-4 py-2"
        >
          Try again
        </button>
      )}
    </div>
  )
}
