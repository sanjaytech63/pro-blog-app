'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthLayout from '@/components/layouts/AuthLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SubmitButton } from '@/components/form/SubmitButton'
import { Logo } from '@/components/logo'
import { clientError } from '@/utils/clientError'
import {
  resetPasswordSchema,
  ResetPasswordInput,
} from '@/validators/auth.schema'
import { FormField } from '@/components/ui/form-field'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  async function onSubmit(data: ResetPasswordInput) {
    try {
      const res = await fetch(`/api/auth/reset-password?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: data.password }),
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(err)
      }

      toast.success('Password reset successful')
      router.replace('/login')
    } catch (err) {
      clientError(err, 'Password reset failed')
    }
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md rounded-2xl border-none shadow-xl">
        <div className="flex justify-center">
          <Logo />
        </div>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Reset password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              placeholder="New password"
              type="password"
              {...form.register('password')}
              error={form.formState.errors.password}
            />

            <SubmitButton
              label="Reset password"
              loading={form.formState.isSubmitting}
            />
          </form>

          <p className="text-muted-foreground text-center text-sm">
            <Link href="/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
