import Container from '@/components/container'
import { privacySections } from '@/lib/constants/legal'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-28 dark:bg-black">
      <Container size="small">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>

        <div className="bg-background space-y-8 rounded-2xl border p-8">
          <p className="text-muted-foreground">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>

          {privacySections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-2 font-semibold text-blue-900">Contact Us</h3>
            <p className="text-blue-800">
              Questions? Email us at{' '}
              <a href="mailto:privacy@blogmint.dev" className="underline">
                privacy@blogmint.dev
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
