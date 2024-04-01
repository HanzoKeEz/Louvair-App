'use client'

import priceFormat from '@/lib/priceFormat'
import { useCartStore } from '@/zustand/store'
import Image from 'next/image'
import emptyBasket from '../public/shoppingbag.png'
import { AnimatePresence, motion } from 'framer-motion'
import Checkout from './Checkout'
import OrderConfirmed from './OrderConfirmed'
import { Button } from './ui/button'
import { ArrowLeftCircle, CircleMinus, CirclePlus } from 'lucide-react'
import { CgClose } from 'react-icons/cg'

export default function Cart() {
  const cartStore = useCartStore()
  // console.log('<Cart>: ', cartStore)
  // Reduce to get total price:
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className='fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-screen bg-neutral-950/90 backdrop-blur-sm'
    >
      {/* Shopping Panel */}
      <motion.section
        layout
        onClick={(e) => e.stopPropagation()}
        className='absolute top-0 right-0 w-8/12 h-screen p-12 overflow-y-scroll shadow-md bg-zinc-100/90 lg:w-1/2'
      >
        {/* Conditional Headings */}
        {cartStore.onCheckout === 'cart' && (
          <div className='flex items-center justify-between mb-12'>
            <h1 className='text-2xl text-primary-foreground font-space'>Your shopping Cart</h1>
            <CgClose
              className='w-6 h-6 cursor-pointer bg-zinc-200/80'
              onClick={() => cartStore.toggleCart()}
            />
          </div>
        )}
        {cartStore.onCheckout === 'checkout' && (
          <div className='flex items-center justify-between mb-12'>
            <h1 className='text-2xl text-primary-foreground font-bold'>Check your cart</h1>
            <CgClose
              className='w-6 h-6 cursor-pointer'
              onClick={() => cartStore.setCheckout('cart')}
            />
          </div>
        )}

        {/* Items in Cart */}
        {cartStore.onCheckout === 'cart' && (
          <>
            {cartStore.cart.map((item) => (
              /* Each Item */
              <motion.article
                key={item.id}
                layout
                className='flex gap-4 p-6 mt-3 rounded-lg bg-zinc-100 text-white'
              >
                <Image
                  className='object-cover w-24 h-24 rounded-full shadow'
                  src={item.image}
                  alt={item.name}
                  width={110}
                  height={110}
                  priority
                />
                <motion.div className='flex font-assistant flex-col'>
                  <h2 className='text-md text-white'>{item.name}</h2>
                  <div className='flex items-center gap-2'>
                    <h2 className='text-md text-white'>Qty: {item.quantity}</h2>
                    <button onClick={() => cartStore.removeProduct(item)}>
                      <CircleMinus className='w-6 h-6 transition duration-100 ease-in-out cursor-pointer hover:drop-shadow-md hover:text-red-500 hover:scale-125' />
                    </button>
                    <button onClick={() => cartStore.addProduct(item)}>
                      <CirclePlus className='w-6 h-6 transition duration-100 ease-in-out cursor-pointer hover:drop-shadow-md hover:text-green-500 hover:scale-125 ' />
                    </button>
                  </div>
                  <h2 className='mt-auto text-white text-md'>
                    {item.unit_amount && priceFormat(item.unit_amount)}
                  </h2>
                </motion.div>
              </motion.article>
            ))}
          </>
        )}

        {/* Total */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === 'cart' ? (
          <motion.div layout>
            <p className='py-2 mt-6'>
              <span className='font-semibold text-white'>Total:</span> {priceFormat(totalPrice)}
            </p>
            <button
              onClick={() => cartStore.setCheckout('checkout')}
              className='w-full my-12 bg-primary text-white hover:bg-blue-700 hover:text-primary-foreground h-12 '
            >
              Checkout
            </button>
          </motion.div>
        ) : null}

        {/* Checkout Form */}
        {cartStore.onCheckout === 'checkout' && <Checkout />}
        {cartStore.onCheckout === 'success' && <OrderConfirmed />}

        {/* Empty Cart Status */}
        {cartStore.cart.length === 0 && cartStore.onCheckout === 'cart' && (
          <motion.div
            initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
            animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
            className='flex flex-col items-center justify-center w-full h-[90%] gap-2'
          >
            <Image
              src={emptyBasket}
              alt='Empty basket'
              width={200}
              height={200}
              priority
              className='object-cover'
            />
            <h2 className='text-lg font-semibold text-primary-foreground font-space'>
              0 items in your bag
            </h2>
          </motion.div>
        )}
      </motion.section>
    </motion.div>
  )
}
