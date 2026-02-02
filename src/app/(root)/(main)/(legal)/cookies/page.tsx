import Container from '@/components/container'
import { cookiesSections } from '@/lib/constants/legal'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-28 dark:bg-black">
      <Container size="small">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold">Cookie Policy</h1>
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
            This policy explains how we use cookies and similar technologies.
          </p>

          {cookiesSections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </div>
  )
}
