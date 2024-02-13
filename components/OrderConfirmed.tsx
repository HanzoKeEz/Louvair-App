'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import gif from '@/public/spray.gif'
import Link from 'next/link'
import { useCartStore } from '../zustand/store'
import { useEffect } from 'react'

export default function OrderConfirmed() {
	const cartStore = useCartStore()

	useEffect(() => {
		cartStore.setPaymentIntent('')
		cartStore.clearCart()
	}, [])

	const checkoutOrder = () => {
		setTimeout(() => {
			cartStore.setCheckout('cart')
		}, 1000)
		cartStore.toggleCart()
	}

	return (
		<motion.div
			className='flex items-center justify-center my-12 text-gray-200 font-serif'
			initial={{ scale: 0.5, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
		>
			<div className='p-12 rounded-md text-center font-semibold'>
				<h1 className='text-3xl font-semibold'>Your order has been placed!</h1>
				<h2 className='text-md my-4'>Check your email for the receipt</h2>
				<Image src={gif} alt='gif' height={200} width={200} className='py-8 flex justify-center items-center w-full' />
				<div className='flex items-center justify-center gap-12'>
					<Link href={'/dashboard'}>
						<button onClick={checkoutOrder} className='font-medium'>
							Check your Order
						</button>
					</Link>
				</div>
			</div>
		</motion.div>
	)
}
