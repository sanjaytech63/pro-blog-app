'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginInput, loginSchema } from '@/validators/auth.schema'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SubmitButton } from '@/components/form/SubmitButton'
import AuthLayout from '@/components/layouts/AuthLayout'
import { Logo } from '@/components/logo'
import { FormField } from '@/components/ui/form-field'
import { clientError } from '@/utils/clientError'
import { toast } from 'sonner'
import { queryClient } from '@/lib/queryClient'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { authService } from '@/services/client/auth.service'
import { OAuthButton } from '@/components/oauth-button'

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      acceptTerms: false,
    },
  })

  async function onSubmit(data: LoginInput) {
    try {
      const res = await authService.login(data)
      toast.success(res.message)
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="acceptTerms"
                  onCheckedChange={(checked) =>
                    form.setValue('acceptTerms', Boolean(checked))
                  }
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                  </Link>{' '}
                </Label>
              </div>
              <div className="text-right text-sm">
                <Link
                  href="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {form.formState.errors.acceptTerms && (
              <p className="text-destructive text-sm">
                {form.formState.errors.acceptTerms.message}
              </p>
            )}

            <SubmitButton label="Login" loading={form.formState.isSubmitting} />
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <OAuthButton
              provider="google"
              label="Google"
              icon="/images/google.svg"
            />

            <OAuthButton
              iconsText="invert-0 dark:invert"
              provider="github"
              label="GitHub"
              icon="/images/github.svg"
            />
          </div>

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
