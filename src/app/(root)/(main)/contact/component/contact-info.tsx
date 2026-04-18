import { Section } from '@/components/common/section'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Linkedin, Twitter, Github, Instagram } from 'lucide-react'
import Link from 'next/link'

const socials = [
  {
    icon: Linkedin,
    href: 'https://linkedin.com',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com',
  },
  {
    icon: Github,
    href: 'https://github.com',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com',
  },
]

export function ContactInfo() {
  const items = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Rajasthan, India',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'support@blogmint.com',
      href: 'mailto:support@blogmint.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9876543210',
      href: 'tel:+919876543210',
    },
  ]

  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" />

      <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">
            Contact <span className="text-indigo-500">Info</span>
          </h2>

          <p className="mt-1 text-xs text-gray-500 md:text-sm">
            Reach out anytime — we usually respond within 24 hours.
          </p>

          <div className="mt-6 space-y-4">
            {items.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="group flex items-center gap-3 rounded-lg border px-4 py-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border">
                    <Icon size={16} />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">{item.label}</span>

                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-sm font-medium transition"
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <span className="text-sm font-medium">{item.value}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs text-gray-500">
            Built for developers, creators, and learners.
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 sm:justify-start">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.href}
                  className="hover:bg-muted flex h-10 w-10 transform items-center justify-center rounded-lg border transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
