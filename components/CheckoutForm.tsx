'use client'

import { useState, useEffect, FormEvent } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import priceFormat from '@/lib/priceFormat'
import { useCartStore } from '../zustand/store'

interface Props {
	clientSecret: string
}
export default function CheckoutForm({ clientSecret }: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const stripe = useStripe()
	const elements = useElements()
	const cartStore = useCartStore()

	const totalPrice = cartStore.cart.reduce((acc, item) => acc + item.unit_amount! * item.quantity!, 0)

	useEffect(() => {
		if (!stripe) return
		if (!clientSecret) return
	}, [stripe])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!stripe || !elements) {
			return
		}
		setIsLoading(true)

		stripe
			.confirmPayment({
				elements,
				redirect: 'if_required',
			})
			.then((result) => {
				if (!result.error) {
					cartStore.setCheckout('success')
				}
				setIsLoading(false)
			})
	}

	return (
		<form className='text-gray-600' onSubmit={handleSubmit} id='payment-form'>
			<PaymentElement id='payment-element' options={{ layout: 'tabs' }} />
			<h1 className='py-4 text-sm font-bold'>Total: {priceFormat(totalPrice)} </h1>
			<button
				className={`bg-primary py-2 mt-4 w-full rounded-md text-white disabled:opacity-25`}
				id='submit'
				disabled={isLoading || !stripe || !elements}
			>
				{isLoading ? <span>Processing 👀</span> : <span>Pay now </span>}
			</button>
		</form>
	)
}
