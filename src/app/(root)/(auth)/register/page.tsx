'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthLayout from '@/components/layouts/AuthLayout'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SubmitButton } from '@/components/form/SubmitButton'
import { Logo } from '@/components/logo'
import { registerAction } from '@/app/actions/auth.actions'
import { clientError } from '@/utils/clientError'
import { registerSchema, RegisterInput } from '@/validators/auth.schema'
import { FormField } from '@/components/ui/form-field'

export default function RegisterPage() {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data: RegisterInput) {
    try {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => fd.append(k, v))
      await registerAction(fd)
    } catch (err) {
      clientError(err, 'Registration failed')
    }
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md rounded-2xl border-none shadow-xl">
        <div className="flex justify-center">
          <Logo />
        </div>

        <CardHeader className="text-center">
          <p className="text-muted-foreground text-sm">
            Create your free account
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              placeholder="Full name"
              {...form.register('fullName')}
              error={form.formState.errors.fullName}
            />

            <FormField
              placeholder="Email address"
              type="email"
              {...form.register('email')}
              error={form.formState.errors.email}
            />

            <FormField
              placeholder="Password"
              type="password"
              {...form.register('password')}
              error={form.formState.errors.password}
            />

            <SubmitButton
              label="Create account"
              loading={form.formState.isSubmitting}
            />
          </form>

          <p className="text-muted-foreground text-center text-xs">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
