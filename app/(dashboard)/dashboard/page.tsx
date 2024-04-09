import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/shell'
import { getUserSubscriptionPlan } from '@/lib/subscription'
import { authOptions, getAuthSession } from '@/app/_clients/nextAuth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Icons } from '@/components/shared/icons'

import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Dashboard'
}

export default async function DashboardPage() {
  const user = await getAuthSession()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading='Home Dashboard'
        text='Browse, Shop or Manage billing and your subscription plan.'
      />
      <div className='grid gap-8'>
        <Alert className='!pl-14'>
          <Icons.warning />
          <AlertTitle>Louvair App is in test mode.</AlertTitle>
          <AlertDescription>
            Taxonomy app is a demo app using a Stripe test environment. You can find a list of test
            card numbers on the{' '}
            <a
              href='https://stripe.com/docs/testing#cards'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-8'
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>
      </div>
    </DashboardShell>
  )
}
