import {
  PenTool,
  LayoutDashboard,
  Rocket,
  ShieldCheck,
  Search,
  Layers,
} from 'lucide-react'

export const FEATURES = [
  {
    title: 'Rich Editor',
    description:
      'Write blogs with a powerful editor supporting formatting, media, and code blocks.',
    icon: PenTool,
  },
  {
    title: 'Admin Dashboard',
    description:
      'Manage posts, categories, and users with a clean and scalable admin UI.',
    icon: LayoutDashboard,
  },
  {
    title: 'SEO Optimized',
    description:
      'Built-in SEO features for better visibility and ranking on search engines.',
    icon: Search,
  },
  {
    title: 'Fast Performance',
    description:
      'Optimized for speed using server components, caching, and efficient queries.',
    icon: Rocket,
  },
  {
    title: 'Secure & Reliable',
    description:
      'Authentication, validation, and secure APIs for production environments.',
    icon: ShieldCheck,
  },
  {
    title: 'Scalable Architecture',
    description:
      'Clean architecture with reusable components and modular services.',
    icon: Layers,
  },
]
