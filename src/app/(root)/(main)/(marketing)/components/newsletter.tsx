'use client'

import { useState } from 'react'
import Container from '@/components/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((res) => setTimeout(res, 1000))

    setSuccess(true)
    setEmail('')
    setLoading(false)
  }

  return (
    <section className="bg-muted/30 py-20">
      <Container className="max-w-2xl text-center">
        {/* ICON */}
        <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <Mail className="h-5 w-5" />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold">Stay Updated</h2>

        <p className="text-muted-foreground mt-2">
          Get the latest articles and updates delivered to your inbox.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? '...' : 'Subscribe'}
          </Button>
        </form>

        {success && (
          <p className="mt-3 text-sm text-green-500">
            Subscribed successfully!
          </p>
        )}
      </Container>
    </section>
  )
}
