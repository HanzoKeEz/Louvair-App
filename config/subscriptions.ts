import { SubscriptionPlan } from 'types'

export const freePlan: SubscriptionPlan = {
  name: 'Free',
  description: 'The free plan has limited features and is meant for personal use.',
  stripePriceId: ''
}

export const proPlan: SubscriptionPlan = {
  name: 'PRO',
  description:
    'The PRO plan supplies your subscription with one monthly refill of an oil fragrance of your choice along with one commercial grade Air Diffuser.',
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID as string
}
