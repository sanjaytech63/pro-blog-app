import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Logo } from '@/components/logo'
import { NewsletterForm } from './newsletter-form'
import { footerMenus, socialLinks } from './footer.constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Top */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-2">
            <Logo />

            <p className="text-muted-foreground text-sm leading-relaxed">
              BlogMint helps creators write, publish, and grow their audience
              with modern, scalable tools.
            </p>

            <div className="text-muted-foreground space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>hello@blogmint.dev</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span>New York, USA</span>
              </div>
            </div>
          </div>

          {/* Menus */}
          {footerMenus.map((menu) => (
            <div key={menu.title}>
              <h4 className="mb-4 text-sm font-semibold">{menu.title}</h4>
              <ul className="text-muted-foreground space-y-3 text-sm">
                {menu.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-foreground transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter + Social */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h4 className="mb-2 text-sm font-semibold">Stay Updated</h4>
              <p className="text-muted-foreground mb-4 text-sm">
                Get product updates and articles straight to your inbox.
              </p>
              <NewsletterForm />
            </div>

            <div>
              <h5 className="mb-3 text-sm font-semibold">Follow us</h5>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="hover:bg-muted flex h-10 w-10 transform items-center justify-center rounded-lg border transition-all duration-300 hover:-translate-y-1"
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-muted-foreground mt-16 flex flex-col gap-4 border-t pt-6 text-sm md:flex-row md:justify-between">
          <p>© {year} BlogMint. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
