'use client'

import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthLayout from '@/components/layouts/AuthLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SubmitButton } from '@/components/form/SubmitButton'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { verifyOtpAction, resendOtpAction } from '@/app/actions/auth.actions'
import { clientError } from '@/utils/clientError'
import { verifyOtpSchema, VerifyOtpInput } from '@/validators/auth.schema'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { FormField } from '@/components/ui/form-field'

export default function VerifyOtpPage() {
  const form = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
  })

  async function onSubmit(data: VerifyOtpInput) {
    try {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => fd.append(k, v))
      await verifyOtpAction(fd)
    } catch (err) {
      clientError(err, 'Invalid or expired OTP')
    }
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md rounded-2xl border-none shadow-xl">
        <div className="flex justify-center">
          <Logo />
        </div>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify your email</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              placeholder="Email address"
              type="email"
              {...form.register('email')}
              error={form.formState.errors.email}
            />

            <Controller
              control={form.control}
              name="otp"
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />

            <SubmitButton
              label="Verify OTP"
              loading={form.formState.isSubmitting}
            />
          </form>

          <form action={resendOtpAction}>
            <Button variant="outline" className="w-full">
              Resend OTP
            </Button>
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
