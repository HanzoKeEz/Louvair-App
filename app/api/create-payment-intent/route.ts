import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
// import { PrismaClient } from '@prisma/client';
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { AddCartType } from '@/types/AddCartType'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // Setting the Stripe API version to be used.
  apiVersion: '2023-10-16'
})

const calcOrderAmount = (items: AddCartType[]) => {
  console.log('create-payment-intent:', items)
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)
  return totalPrice
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userSession = await getServerSession(req, res, authOptions)

  if (!userSession?.user) {
    res.status(403).json({ message: 'No Users logged in' })
    return
  }

  const { items, payment_intent_id } = req.body

  const orderData = {
    user: { connect: { id: (userSession.user as any).id } },
    amount: calcOrderAmount(items),
    currency: 'usd',
    status: 'pending',

    paymentIntentID: payment_intent_id,

    products: {
      create: items.map((item: any) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        image: item.image,
        quantity: item.quantity
      }))
    }
  }

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
        amount: calcOrderAmount(items)
      })

      const existing_order = await db.order.findFirst({
        where: { paymentIntentID: updated_intent.id },
        include: { products: true }
      })

      if (!existing_order) {
        res.status(404).json({
          message: 'Oops no order or invalid payment intent :(',
          currentIntent: current_intent,
          existingOrder: existing_order
        })
        return
      }

      // Update existing order with new products.
      const updated_order = await db.order.update({
        where: { id: existing_order?.id },
        data: {
          amount: calcOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item: any) => ({
              name: item.name,
              description: item.description || null,
              unit_amount: parseFloat(item.unit_amount),
              image: item.image,
              quantity: item.quantity
            }))
          }
        }
      })
      // If order updated then return success message response.
      res.status(200).json({
        message: 'Order updated successfully!',
        paymentIntent: updated_intent,
        order: updated_order
      })
      return
    }
  } else {
    // STEP 2: CREATING NEW ORDER IF PAYMENT INTENT DOESN'T EXIST ⭐️
    // If no payment_intent_id exists we then create a new intent for the order.

    const new_payment_intent = await stripe.paymentIntents.create({
      amount: calcOrderAmount(items),
      currency: 'usd',
      automatic_payment_methods: { enabled: true }
    })
    // Update earlier defined orderData object with a new payment_intent_id!
    orderData.paymentIntentID = new_payment_intent.id
    const newOrder = await db.order.create({
      data: orderData
    })
    // STRIPE: RETURN PAYMENT INTENT ID ⭐️
    res.status(200).json({ paymentIntent: new_payment_intent, order: newOrder })
    return
  }
}
