'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import AuthLayout from '@/components/layouts/AuthLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SubmitButton } from '@/components/form/SubmitButton'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { FormField } from '@/components/ui/form-field'

import { api } from '@/lib/axios'
import { clientError } from '@/utils/clientError'
import { verifyOtpSchema, VerifyOtpInput } from '@/validators/auth.schema'
import { authService } from '@/services/client/auth.service'

/* ---------------- CONSTANTS ---------------- */
const RESEND_INTERVAL = 120 // must match backend rate limit

export default function VerifyOtpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const emailFromQuery = searchParams.get('email') ?? ''

  const [countdown, setCountdown] = useState(0)

  const form = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: emailFromQuery,
      otp: '',
    },
  })

  /* ---------------- COUNTDOWN ---------------- */
  useEffect(() => {
    if (countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  /* ---------------- VERIFY OTP ---------------- */
  async function onSubmit(data: VerifyOtpInput) {
    try {
      const res = await authService.verifyOtp(data.email, data.otp)
      toast.success(res.message)
      router.push('/login')
    } catch (err) {
      clientError(err, 'Invalid or expired OTP')
    }
  }

  /* ---------------- RESEND OTP ---------------- */
  async function handleResendOtp() {
    try {
      const email = form.getValues('email')
      const res = await authService.resendOtp(email)
      toast.success(res.message)
      setCountdown(RESEND_INTERVAL)
    } catch (err) {
      clientError(err, 'Please wait before requesting another OTP')
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
                  <InputOTPGroup className="flex w-full gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} className="flex-1" />
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

          {/* 🔥 RESEND OTP WITH COUNTDOWN */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleResendOtp}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
          </Button>

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
