import {
  FileText,
  LayoutDashboard,
  Newspaper,
  Settings,
  Users,
} from 'lucide-react'

export const dashboardNav = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Posts',
    href: '/dashboard/posts',
    icon: FileText,
  },
  {
    title: 'Newsletter',
    href: '/dashboard/newsletter',
    icon: Newspaper,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]
