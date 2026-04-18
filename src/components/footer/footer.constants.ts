import { Github, Twitter, Linkedin, Instagram } from 'lucide-react'

export const footerMenus = [
  {
    title: 'Categories',
    links: [
      { name: 'Web Development', href: '/blog?category=web-dev' },
      { name: 'React', href: '/blog?category=react' },
      { name: 'Next.js', href: '/blog?category=nextjs' },
      { name: 'Backend', href: '/blog?category=backend' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'All Articles', href: '/blog' },
      { name: 'Popular Posts', href: '/blog?sort=popular' },
      { name: 'Latest Posts', href: '/blog?sort=latest' },
      { name: 'Guides', href: '/blog?tag=guide' },
    ],
  },
]

export const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: Github,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com',
  },
]
