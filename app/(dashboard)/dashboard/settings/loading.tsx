import { Card } from '@/components/ui/card'
import { CardSkeleton } from '@/components/ui/card-skeleton'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/ui/shell'

export default function DashboardSettingsLoading() {
	return (
		<DashboardShell>
			<DashboardHeader heading='Settings' text='Manage account and website settings.' />
			<div className='grid gap-10'>
				<CardSkeleton />
			</div>
		</DashboardShell>
	)
}
