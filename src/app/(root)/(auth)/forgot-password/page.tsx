'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthLayout from '@/components/layouts/AuthLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SubmitButton } from '@/components/form/SubmitButton'
import { Logo } from '@/components/logo'
import { forgotPasswordAction } from '@/app/actions/auth.actions'
import { clientError } from '@/utils/clientError'
import {
  forgotPasswordSchema,
  ForgotPasswordInput,
} from '@/validators/auth.schema'
import { FormField } from '@/components/ui/form-field'

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: ForgotPasswordInput) {
    try {
      const fd = new FormData()
      fd.append('email', data.email)
      await forgotPasswordAction(fd)
    } catch (err) {
      clientError(err, 'Unable to send reset link')
    }
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md rounded-2xl border-none shadow-xl">
        <div className="flex justify-center">
          <Logo />
        </div>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Forgot password?</CardTitle>
          <p className="text-muted-foreground text-sm">
            We’ll send you a reset link
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              placeholder="Email address"
              type="email"
              {...form.register('email')}
              error={form.formState.errors.email}
            />

            <SubmitButton
              label="Send reset link"
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
