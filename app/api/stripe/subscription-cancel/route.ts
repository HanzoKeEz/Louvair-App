import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/app/_clients/nextAuth'
import Stripe from 'stripe'

export async function GET(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16'
  })

  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      {
        error: {
          code: 'no-access',
          message: 'You are not signed in.'
        }
      },
      { status: 401 }
    )
  }
  const stripeSubscriptionId = session.user.subscriptionId

  const subscription = await stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: true
    // metadata : {payingUserEmail : session.user?.email!}
  })

  return NextResponse.json({ subscription }, { status: 200 })
}
