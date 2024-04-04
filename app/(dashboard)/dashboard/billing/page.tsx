import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { authOptions } from '@/lib/auth'
import { getUserSubscriptionPlan } from '@/lib/subscription'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BillingForm } from '@/components/billing-form'
import { getCurrentUser } from '@/lib/session'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { FileWarning, FileWarningIcon } from 'lucide-react'
import TestCards from '@/components/TestCards'

export const metadata = {
  title: 'Billing',
  description: 'Manage billing and your subscription plan.'
}

export default async function BillingPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(subscriptionPlan.stripeSubscriptionId)
    isCanceled = stripePlan.canceled_at !== null
    console.log('<BillingPage> :', stripePlan)
  }

  // const subscription = await db.post.findMany({
  //   where: {
  //     authorId: user.id
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     published: true,
  //     createdAt: true
  //   },
  //   orderBy: {
  //     updatedAt: 'desc'
  //   }
  // })

  return (
    <DashboardShell>
      <DashboardHeader
        heading='Billing'
        text='Manage billing and your subscription plan.'
      ></DashboardHeader>
      <div className='flex flex-col justify-center items-center gap-8 font-space '>
        <Alert className='!pl-14'>
          <FileWarning />
          <AlertTitle>Louvair is in Test mode.</AlertTitle>
          <AlertDescription>
            L&apos;ouvair has partnered with Stripe to ensure the most secure and private payments.
            You can find a list of test card numbers on the
          </AlertDescription>
        </Alert>

        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled
          }}
        />
        <div className='w-full flex justify-center items-center border'>
          <TestCards />
        </div>
      </div>
    </DashboardShell>
  )
}
