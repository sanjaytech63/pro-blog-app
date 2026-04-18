import { Section } from '@/components/common/section'
import Container from '@/components/container'
import { ContactHero } from './component/contact-hero'
import { ContactForm } from './component/contact-form'
import { ContactInfo } from './component/contact-info'

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Section id="contact-page">
        <Container>
          <div className="grid overflow-hidden rounded-2xl border lg:grid-cols-2">
            <ContactInfo />
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  )
}
