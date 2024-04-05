import Stripe from 'stripe'
import { db } from '@/lib/db'

import { NextRequest, NextResponse } from 'next/server'

// Required to disable body parser, otherwise we get an error from Stripe.
// export const config = {
//   api: {
//     bodyParser: false
//   }
// }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

const webhookHandler = async (req: NextRequest) => {
  try {
    const buf = await req.text()
    const sig = req.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : 'Unknown error'

      if (err! instanceof Error) console.log(err)
      console.log(`❌ Error message: ${errMessage}`)

      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errMessage}`
          }
        },
        { status: 400 }
      )
    }

    // Successfully constructed event.
    console.log('✅ Success:', event.id)

    // getting to the data we want from the event
    const subscription = event.data.object as Stripe.Subscription
    const subscriptionId = subscription.id

    switch (event.type) {
      case 'customer.subscription.created':
        await db.user.update({
          where: {
            stripeCustomerId: subscription.customer as string
          },
          data: {
            isActive: true,
            subscriptionId: subscriptionId
          }
        })
        break
      case 'customer.subscription.deleted':
        await db.user.update({
          where: {
            stripeCustomerId: subscription.customer as string
          },
          data: {
            isActive: false
          }
        })
        break
      case 'payment_intent.created':
        const paymentIntent = event.data.object
        console.log('Payment intent was created')
        break

        break
      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge
        if (typeof charge.payment_intent === 'string') {
          const order = await db.order.update({
            where: { paymentIntentID: charge.payment_intent },
            data: { status: 'complete' }
          })
        }
        break
      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
    }

    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`
        }
      },
      { status: 405 }
    ).headers.set('Allow', 'POST')
  }
}

export { webhookHandler as POST }
