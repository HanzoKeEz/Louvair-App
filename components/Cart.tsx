'use client'

import { useCartStore } from '../zustand/store'
import { motion, AnimatePresence } from 'framer-motion'
import Checkout from './Checkout'
import OrderConfirmed from './OrderConfirmed'
import formatPrice from '@/utils/PriceFormat'
import Image from 'next/image'
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'
import ShoppingBag from '../public/shoppingbag.png'
import { Button } from './ui/button'

export default function Cart() {
	const cartStore = useCartStore()

	//Total Price
	const totalPrice = cartStore.cart.reduce((acc, item) => {
		return acc + item.unit_amount! * item.quantity!
	}, 0)

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={() => cartStore.toggleCart()}
				className='fixed w-full h-screen left-0 top-0 bg-zinc-900/90'
			>
				{/* Cart */}
				<motion.div
					layout
					onClick={(e) => e.stopPropagation()}
					className='bg-zinc-200/10 absolute right-0 top-0 h-screen p-12 overflow-y-scroll w-full lg:w-2/5'
				>
					{cartStore.onCheckout === 'cart' && (
						<Button onClick={() => cartStore.toggleCart()} className='text-sm font-bold bg-black/40'>
							Back to store
						</Button>
					)}
					{cartStore.onCheckout === 'checkout' && (
						<Button
							onClick={() => cartStore.setCheckout('cart')}
							className='text-sm font-bold flex flex-col text-center justify-center items-center h-8'
						>
							Check your cart 🛒
						</Button>
					)}
					{/* Cart Items */}
					{cartStore.onCheckout === 'cart' && (
						<>
							{cartStore.cart.map((item) => (
								<motion.div layout key={item.id} className='flex p-4 gap-4 bg-zinc-600 my-4 rounded-lg'>
									<Image className='rounded-md h-24' src={item.image} alt={item.name} width={120} height={120} />
									<motion.div layout>
										<h2>{item.name}</h2>
										{/* Update quantity of a product */}
										<div className='flex items-center justify-center gap-3 '>
											<h2 className='mr-6'>Quantity: {item.quantity}</h2>
											<button
												onClick={() =>
													cartStore.removeProduct({
														id: item.id,
														image: item.image,
														name: item.name,
														unit_amount: item.unit_amount,
														quantity: item.quantity,
													})
												}
											>
												<IoRemoveCircle size={24} />
											</button>

											<button
												onClick={() =>
													cartStore.addProduct({
														id: item.id,
														image: item.image,
														name: item.name,
														unit_amount: item.unit_amount,
														quantity: item.quantity,
													})
												}
											>
												<IoAddCircle size={24} />
											</button>
										</div>

										<p className='text-sm'>{item.unit_amount && formatPrice(item.unit_amount)}</p>
									</motion.div>
								</motion.div>
							))}
						</>
					)}

					{/* Checkout and total */}
					{cartStore.cart.length > 0 && cartStore.onCheckout === 'cart' ? (
						<motion.div layout>
							<p>Total: {formatPrice(totalPrice)}</p>
							<Button
								onClick={() => cartStore.setCheckout('checkout')}
								className='w-full my-6 tracking-widest font-roboto'
							>
								Checkout
							</Button>
						</motion.div>
					) : null}

					{/* Checkout Form */}
					{cartStore.onCheckout === 'checkout' && <Checkout />}
					{cartStore.onCheckout === 'success' && <OrderConfirmed />}
					<AnimatePresence>
						{!cartStore.cart.length && cartStore.onCheckout === 'cart' && (
							<motion.div
								animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
								initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
								exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
								className='flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75'
							>
								<h1>You have 0 items in your bag...</h1>
								<Image src={ShoppingBag} alt='empty cart' width={200} height={200} />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</motion.div>
		</>
	)
}
