import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <ShieldAlert className="mb-4 h-14 w-14 text-red-500" />
      <h1 className="text-2xl font-semibold">Access Denied</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        You don’t have permission to access this page. Please contact your
        administrator or sign in with a different account.
      </p>

      <Link
        href="/login"
        className="bg-primary text-primary-foreground mt-6 rounded-md px-5 py-2"
      >
        Go to Login
      </Link>
    </div>
  )
}
