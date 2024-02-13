import { CardSkeleton } from '@/components/ui/card-skeleton'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components//ui/shell'

export default function DashboardBillingLoading() {
	return (
		<DashboardShell>
			<DashboardHeader heading='Billing' text='Manage billing and your subscription plan.' />
			<div className='grid gap-10'>
				<CardSkeleton />
			</div>
		</DashboardShell>
	)
}
