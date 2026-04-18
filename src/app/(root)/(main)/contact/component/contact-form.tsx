'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/common/section'
import { Textarea } from '@/components/ui/textarea'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormValues) => {
    setLoading(true)

    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      reset()
    } catch (err) {
      console.error(err)
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

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ROW 1 */}
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Your Name" {...register('name')} />

            <Input
              type="email"
              placeholder="Your Email"
              {...register('email')}
            />
          </div>

          <Input placeholder="Subject" {...register('subject')} />

          <Textarea
            placeholder="Write your message..."
            {...register('message')}
            rows={10}
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="flex h-10 items-center gap-2 px-5 text-sm"
            >
              {loading ? 'Sending...' : 'Send'}
              <Send size={14} />
            </Button>
          </div>
        </form>
      </div>
    </Section>
  )
}
