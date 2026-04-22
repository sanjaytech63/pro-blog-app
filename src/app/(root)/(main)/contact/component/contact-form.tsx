'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Section } from '@/components/common/section'
import { Textarea } from '@/components/ui/textarea'
import { SubmitButton } from '@/components/form/submit-button'

import { contactService } from '@/services/client/contact.service'
import { toast } from 'sonner'
import { clientError } from '@/utils/clientError'
import { ContactFormValues, contactSchema } from '@/validators/contact.schema'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onSubmit',
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true)

    try {
      const res = await contactService.create(data)

      toast.success(res.message || 'Message sent successfully')

      reset()
    } catch (err: unknown) {
      clientError(err, 'Failed to submit contact info')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section className="relative overflow-hidden">
      <div className="from-primary/10 to-smoke-500/10 pointer-events-none absolute inset-0 bg-linear-to-r transition-opacity duration-300" />

      <div className="relative p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold md:text-2xl">
            Lets <span className="text-indigo-500">Talk</span>
          </h2>

          <p className="mt-1 text-xs text-gray-500 md:text-sm">
            Questions, feedback, or issues? We’re here to help.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ROW */}
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Input placeholder="Your Name" {...register('fullname')} />
              {errors.fullname && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Your Email"
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Input placeholder="Subject" {...register('subject')} />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-500">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Write your message..."
              {...register('message')}
              rows={6}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex w-full justify-end pt-2">
            <SubmitButton loading={loading} label="Submit" />
          </div>
        </form>
      </div>
    </Section>
  )
}
