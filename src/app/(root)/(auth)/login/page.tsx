'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginInput, loginSchema } from '@/validators/auth.schema'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SubmitButton } from '@/components/form/SubmitButton'
import AuthLayout from '@/components/layouts/AuthLayout'
import { Logo } from '@/components/logo'
import { FormField } from '@/components/ui/form-field'
import { clientError } from '@/utils/clientError'
import { toast } from 'sonner'
import { queryClient } from '@/lib/queryClient'
import { authService } from '@/services/client/auth.service'

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    try {
      const res = await api.post('/auth/login', data)
      toast.success(res.data.message)

      await queryClient.invalidateQueries({ queryKey: ['me'] })

      router.replace('/')
    } catch (err) {
      clientError(err, 'Invalid email or password')
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
            Sign in to your account
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

            <FormField
              placeholder="Password"
              type="password"
              {...form.register('password')}
              error={form.formState.errors.password}
            />

            <SubmitButton label="Login" loading={form.formState.isSubmitting} />
          </form>

          <div className="text-muted-foreground text-center text-xs">
            Create account?{' '}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
