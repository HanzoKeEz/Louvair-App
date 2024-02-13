'use client'

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCartStore } from '../zustand/store'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CheckoutForm from './CheckoutForm'
import OrderAnimation from './OrderAnimation'
import { motion } from 'framer-motion'
import { useThemeStore } from '../zustand/store'

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!) // ✅

export default function Checkout() {
	const cartStore = useCartStore()
	const themeStore = useThemeStore()

	const [clientSecret, setClientSecret] = useState('')
	const [stripeTheme, setStripeTheme] = useState<'flat' | 'stripe' | 'night' | 'none'>('stripe')
	const router = useRouter()

	useEffect(() => {
		//Set the theme of stripe
		if (themeStore.mode === 'dark') setStripeTheme('night')

		if (themeStore.mode === 'light') setStripeTheme('stripe')

		//Create a paymentIntent as soon as the page loads up
		fetch('/api/create-payment-intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				items: cartStore.cart,
				payment_intent_id: cartStore.paymentIntent,
			}),
		})
			.then((res) => {
				if (res.status === 403) {
					return router.push('/api/auth/login')
				}
				return res.json()
			})
			.then((data) => {
				setClientSecret(data.paymentIntent.client_secret)
				cartStore.setPaymentIntent(data.paymentIntent.id)
			})
	}, [])

	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: stripeTheme,
			labels: 'floating',
		},
	}

	return (
		<div>
			{clientSecret && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0 }}
					transition={{
						delay: 1,
						type: 'spring',
						duration: 0.5,
					}}
				>
					<Elements options={options} stripe={promise}>
						<CheckoutForm clientSecret={clientSecret} />
					</Elements>
				</motion.div>
			)}
			{!clientSecret && <OrderAnimation />}
		</div>
	)
}
