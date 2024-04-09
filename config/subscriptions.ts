export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  stripePriceId: string
  price: number
}

export const memberSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'pro',
    name: 'Pro',
    description:
      'The PRO plan supplies your subscription with one monthly refill of an oil fragrance of your choice along with one commercial grade Air Diffuser.',
    stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID ?? '',
    price: 110
  }
]
