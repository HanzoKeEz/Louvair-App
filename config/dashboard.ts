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
      title: 'Products',
      href: '/dashboard',
      icon: 'media'
    },
    {
      title: 'Subscription',
      href: '/dashboard/billing',
      icon: 'billing'
    },
    {
      title: 'Orders',
      href: '/dashboard/orders',
      icon: 'user'
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings'
    }
  ]
}
