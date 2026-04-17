'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { ContactFormValues, contactSchema } from '@/validators/contact.schema'

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true)
    setSuccess(false)

    try {
      await new Promise((res) => setTimeout(res, 1000))

      setSuccess(true)
      form.reset()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Send a Message</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* NAME */}
        <div>
          <Input placeholder="Your Name" {...form.register('name')} />
          <p className="text-destructive mt-1 text-xs">
            {form.formState.errors.name?.message}
          </p>
        </div>

        {/* EMAIL */}
        <div>
          <Input placeholder="Your Email" {...form.register('email')} />
          <p className="text-destructive mt-1 text-xs">
            {form.formState.errors.email?.message}
          </p>
        </div>

        {/* MESSAGE */}
        <div>
          <Textarea
            placeholder="Your Message"
            rows={5}
            {...form.register('message')}
          />
          <p className="text-destructive mt-1 text-xs">
            {form.formState.errors.message?.message}
          </p>
        </div>

        {/* BUTTON */}
        <Button
          type="submit"
          className="flex w-full items-center gap-2"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
          <Send className="h-4 w-4" />
        </Button>

        {success && (
          <p className="mt-2 text-sm text-green-500">
            Message sent successfully!
          </p>
        )}
      </form>
    </div>
  )
}
