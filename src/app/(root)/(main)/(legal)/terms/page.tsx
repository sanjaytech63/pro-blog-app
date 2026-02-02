import Container from '@/components/container'
import { termsSections } from '@/lib/constants/legal'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-28 dark:bg-black">
      <Container size="small">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">
            Effective date:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="bg-background space-y-8 rounded-2xl border p-8">
          <p className="text-muted-foreground">
            Please read these terms carefully before using our service.
          </p>

          {termsSections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}

          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
            <h3 className="mb-2 font-semibold text-yellow-900">
              Important Notice
            </h3>
            <p className="text-yellow-800">
              If you do not agree to these terms, you must not use this service.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
