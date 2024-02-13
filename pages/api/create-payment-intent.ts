import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'

// PRISMA: BEST PRACTICE FOR INSTANTIATING PRISMA CLIENT WITH NEXT.JS ⭐️
// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/db'

import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { AddCartType } from '@/types/AddCartType'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	// Setting the Stripe API version to be used.
	apiVersion: '2022-11-15',
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
		res.status(403).json({ message: 'Not logged in' })
		return
	}
	// Extract the data from the body
	const { items, payment_intent_id } = req.body
	console.log(items, payment_intent_id)

	// Create the order data, "PRISMA CODE DB" // Data necessary for creating the payment_intent_id
	const orderData = {
		user: { connect: { id: (userSession.user as any).id } },
		amount: calcOrderAmount(items),
		currency: 'usd',
		status: 'Pending',
		paymentIntentID: payment_intent_id,
		products: {
			create: items.map((item: any) => ({
				name: item.name,
				description: item.description || null,
				unit_amount: parseFloat(item.unit_amount),
				image: item.image,
				quantity: item.quantity,
			})),
		},
	}

	//  Check if the payment intent exists then update the order
	if (payment_intent_id) {
		const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
		if (current_intent) {
			const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
				amount: calcOrderAmount(items),
			})
			// Fetch order with product ids
			const existing_order = await prisma.order.findFirst({
				where: { paymentIntentID: updated_intent.id },
				include: { products: true },
			})
			if (!existing_order) {
				res.status(404).json({
					message: 'No order or invalid payment intent',
					currentIntent: current_intent,
					existingOrder: existing_order,
				})
				return
			}

			// Update Existing Order
			const updated_order = await prisma.order.update({
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
							quantity: item.quantity,
						})),
					},
				},
			})
			res.status(200).json({
				message: 'Order updated successfully!',
				paymentIntent: updated_intent,
				order: updated_order,
			})
			return
		}
	} else {
		// Create a new order with prisma and return the orderData to the client
		const new_payment_intent = await stripe.paymentIntents.create({
			amount: calcOrderAmount(items),
			currency: 'usd',
			automatic_payment_methods: { enabled: true },
		})
		// Update earlier defined orderData object with a new payment_intent_id!
		orderData.paymentIntentID = new_payment_intent.id
		const newOrder = await prisma.order.create({
			data: orderData,
		})
		// STRIPE: RETURN PAYMENT INTENT ID ⭐️
		res.status(200).json({ paymentIntent: new_payment_intent, order: newOrder })
		return
	}
}
