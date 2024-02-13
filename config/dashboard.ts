import { DashboardConfig } from '@/types'

export const dashboardConfig: DashboardConfig = {
	mainNav: [
		{
			title: 'Documentation',
			href: '/docs',
		},
		{
			title: 'Support',
			href: '/support',
			disabled: true,
		},
	],
	sidebarNav: [
		{
			title: 'Orders',
			href: '/dashboard/orders',
			icon: 'post',
		},
		{
			title: 'Billing',
			href: '/dashboard/billing',
			icon: 'billing',
		},
		{
			title: 'Settings',
			href: '/dashboard/settings',
			icon: 'settings',
		},
	],
}
