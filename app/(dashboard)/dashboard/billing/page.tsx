import { ManageUserSubscriptionButton } from '@/components/Subscription/manage-user-subscription-button'
import SignInBtn from '@/components/Auth/sign-in-btn'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { memberSubscriptionPlans } from '@/config/subscriptions'
import { getAuthSession } from '@/app/_clients/nextAuth'
import { getUserSubscriptionPlan } from '@/lib/subscription'
import { redirect } from 'next/navigation'

export default async function Billing() {
  const session = await getAuthSession()
  const subscriptionPlan = await getUserSubscriptionPlan()

  if (!session) return redirect('/')

  return (
    <div className='min-h-[calc(100vh-57px)] py-8 px-4 md:px-16 lg:px-24'>
      <Card className='p-6 mb-2'>
        <p className='text-lg font-semibold leading-none'>{subscriptionPlan?.name}</p>
        <p className='text-sm text-muted-foreground'>
          {subscriptionPlan?.isSubscribed
            ? 'You are not subscribed to any plan.'
            : subscriptionPlan?.isCanceled
            ? 'Your plan will be canceled on '
            : 'Your plan renews on '}
          {subscriptionPlan?.stripeCurrentPeriodEnd
            ? subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString()
            : null}
        </p>
      </Card>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {memberSubscriptionPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardFooter className='flex items-end'>
              {session?.user ? (
                <ManageUserSubscriptionButton
                  userId={session.user.id}
                  email={session.user.email as string}
                  isSubscribed={subscriptionPlan?.isSubscribed as boolean}
                  isCurrentPlan={subscriptionPlan?.stripePriceId === plan.stripePriceId}
                  stripePriceId={plan.stripePriceId}
                  stripeCustomerId={subscriptionPlan?.stripeCustomerId!}
                />
              ) : (
                <SignInBtn />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
