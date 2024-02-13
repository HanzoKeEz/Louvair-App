import { redirect } from 'next/navigation'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/ui/shell'
import { UserNameForm } from '@/components/UserNameForm'

export const metadata = {
	title: 'Settings',
	description: 'Manage account and website settings.',
}

export default async function SettingsPage() {
	return (
		<DashboardShell>
			<DashboardHeader heading='Settings' text='Manage account and website settings.' />
			<div className='grid gap-10'></div>
		</DashboardShell>
	)
}
