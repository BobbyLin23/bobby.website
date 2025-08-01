import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: '/',
  },
  {
    label: 'Projects',
    icon: 'i-lucide-folder',
    to: '/projects',
  },
  {
    label: 'Blog',
    icon: 'i-lucide-file-text',
    to: '/blogs',
  },
  {
    label: 'Weekly',
    icon: 'i-lucide-calendar',
    to: '/weekly',
  },
]
