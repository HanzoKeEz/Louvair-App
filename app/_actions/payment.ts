'use server'

import { authOptions } from '../_clients/nextAuth'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export async function checkout() {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('session not found')
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user?.stripeCustomerId) {
    throw new Error('user has no stripeCustomerId')
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      // create your items
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1
      }
    ],
    automatic_tax: { enabled: true },
    customer: user.stripeCustomerId,
    customer_update: {
      // for automatic_tax calculation
      shipping: 'auto'
    },
    shipping_address_collection: {
      // for automatic_tax calculation
      allowed_countries: ['US']
    },
    success_url:
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.NEXT_PUBLIC_WEBSITE_URL
  })

  if (!checkoutSession.url) {
    throw new Error('checkoutSession.url not found')
  }

  redirect(checkoutSession.url)
}

export async function cancel(id: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('session not found')
  }

  if (!session.user.isPaid) {
    throw new Error('user is not active')
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user?.stripeCustomerId) {
    throw new Error('user has no stripeCustomerId')
  }

  const subscription = await stripe.subscriptions.cancel(id)

  if (subscription.status === 'canceled') {
    await db.user.update({
      where: { id: session.user.id },
      data: { isPaid: false }
    })
  }

  redirect('/')
}

export async function status() {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('session not found')
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user?.stripeCustomerId) {
    throw new Error('user not found')
  }

  return await stripe.subscriptions.list({
    customer: user.stripeCustomerId
  })
}
