'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { clientError } from '@/utils/clientError'
import { createNewsletterDto } from '@/validators/create-newsletter-schema'
import type { SubscribePayload } from '@/types/newsletter.types'
import { newsletterService } from '@/services/client/newsletter.client.service'

import { FormField } from '../ui/form-field'
import { SubmitButton } from '../form/submit-button'

export function NewsletterForm() {
  const form = useForm<SubscribePayload>({
    resolver: zodResolver(createNewsletterDto),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(data: SubscribePayload) {
    try {
      const res = await newsletterService.subscribe(data)
      toast.success(res.message)

      form.reset()
    } catch (err) {
      clientError(err, 'Subscription failed')
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        placeholder="Enter your email"
        type="email"
        {...form.register('email')}
        error={form.formState.errors.email}
      />

      <SubmitButton label="Subscribe" loading={form.formState.isSubmitting} />
    </form>
  )
}
