'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import payment from '@/public/payment_mail.gif'
import Link from 'next/link'

import { useCartStore } from '@/zustand/store'
import { useEffect } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'

export default function OrderConfirmed() {
  const cartStore = useCartStore()

  useEffect(() => {
    cartStore.setPaymentIntent('')
    cartStore.clearCart()

    return () => {
      cartStore.setPaymentIntent('')
      cartStore.clearCart()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCheckout = () => {
    setTimeout(() => {
      cartStore.setCheckout('cart')
    }, 1000)
    cartStore.toggleCart()
  }

  return (
    <motion.div
      className='flex flex-col items-center justify-center my-12'
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className='p-8 text-center rounded-b-md'>
        <h1 className='text-xl font-medium'>Your order has been confirmed</h1>
        <h2 className='my-4 text-sm'>Check your email for the receipt</h2>
        <p className='text-sm'>L&apos;ouvair members can view order history in your dashboard.</p>
        <Image
          src='/assets/example.gif'
          alt='payment'
          width={120}
          height={120}
          className='w-full py-8'
        />
        {/* <Player
          autoplay
          loop={false}
          keepLastFrame
          src={orderCompleted}
          style={{ height: '400px', width: '400px' }}
        /> */}
      </div>
      <div className='flex flex-col items-center justify-center gap-6'>
        <Link href='/dashboard/orders'>
          <button
            onClick={() => {
              setTimeout(() => {
                handleCheckout()
              }, 1000)
            }}
            className='my-4 bg-green-500 w-full hover:bg-green-900/70 border-2 border-green-500 text-neutral-50 font-bold uppercase py-2 px-6 shadow-lg shadow-green-800/70 rounded-md hover:text-neutral-900 duration-200 hover:shadow-md animate-in'
          >
            Check your Order
          </button>
        </Link>
      </div>
    </motion.div>
  )
}
