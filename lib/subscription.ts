// @ts-nocheck
// TODO: Fix this when we turn strict mode on.
import { getAuthSession } from '@/app/_clients/nextAuth'
import { memberSubscriptionPlans } from '@/config/subscriptions'
import { prisma } from '@/app/_clients/prisma'
import { stripe } from './stripe'

export async function getUserSubscriptionPlan() {
  const session = await getAuthSession()
  if (!session || !session.user) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const isSubscribed =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()

  const plan = isSubscribed
    ? memberSubscriptionPlans.find((plan) => plan.stripePriceId === user.stripePriceId)
    : null

  let isCanceled = false
  if (isSubscribed && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(user.stripeSubscriptionId)
    isCanceled = stripePlan.cancel_at_period_end
  }

  return {
    ...plan,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
    stripeCustomerId: user.stripeCustomerId,
    isSubscribed: user.isSubscribed,
    isCanceled
  }
}
