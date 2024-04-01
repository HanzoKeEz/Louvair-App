import { DashboardConfig } from '@/types/index'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Collection',
      href: '/products'
    },
    {
      title: 'Pricing',
      href: '/dashboard/billing'
    },
    {
      title: 'Dashboard',
      href: '/dashboard'
    }
  ],
  sidebarNav: [
    {
      title: 'Account',
      href: '/dashboard',
      icon: 'laptop'
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'billing'
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings'
    }
  ]
}
