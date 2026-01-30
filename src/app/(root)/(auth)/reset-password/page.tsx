import ResetPasswordForm from '@/components/form/reset-password-form'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  console.log(token, 'log')
  if (!token) {
    return (
      <div className="text-muted-foreground flex min-h-screen items-center justify-center text-sm">
        Invalid or expired reset link
      </div>
    )
  }

  return <ResetPasswordForm token={token} />
}
