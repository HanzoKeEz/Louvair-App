'use client'

import priceFormat from '@/utils/priceFormat'
import { useCartStore } from '@/zustand/store'
import Image from 'next/image'

import { CgClose } from 'react-icons/cg'
import { TbSquareRoundedPlus, TbSquareRoundedMinus } from 'react-icons/tb'
import emptyBasket from '../public/shoppingbag.png'

import { motion, AnimatePresence } from 'framer-motion'
import Checkout from './Checkout'
import OrderConfirmed from './OrderConfirmed'

export default function Cart() {
  const cartStore = useCartStore()

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
      className='fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-screen bg-black/25 backdrop-blur-sm'
    >
      {/* Cart */}
      <motion.section
        layout
        onClick={(e) => e.stopPropagation()}
        className='absolute top-0 right-0 w-8/12 h-screen p-12 overflow-y-scroll shadow-md bg-neutral-100 dark:bg-zinc-900/95 lg:w-2/5'
      >
        {/* Conditional Headings */}
        {cartStore.onCheckout === 'cart' && (
          <div className='flex items-center justify-between mb-12'>
            <h1 className='text-2xl font-bold'>Your shopping cart</h1>
            <CgClose
              className='w-6 h-6 cursor-pointer'
              onClick={() => cartStore.toggleCart()}
            />
          </div>
        )}
        {cartStore.onCheckout === 'checkout' && (
          <div className='flex items-center justify-between mb-12'>
            <h1 className='text-2xl font-bold'>Check your cart</h1>
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
                className='flex gap-4 p-4 mt-3 rounded-lg bg-zinc-200'
              >
                <Image
                  className='w-24 h-24 rounded-full shadow object-contain'
                  src={item.image}
                  alt={item.name}
                  width={110}
                  height={110}
                  priority
                />
                <motion.div className='flex flex-col text-zinc-900'>
                  <h2 className='text-sm font-semibold'>{item.name}</h2>
                  <div className='flex items-center gap-2'>
                    <h2 className='text-sm'>Qty: {item.quantity}</h2>
                    <button onClick={() => cartStore.removeProduct(item)}>
                      <TbSquareRoundedMinus className='w-3 h-3 transition duration-100 ease-in-out cursor-pointer hover:drop-shadow-md hover:text-red-500 hover:scale-125' />
                    </button>
                    <button onClick={() => cartStore.addProduct(item)}>
                      <TbSquareRoundedPlus className='w-3 h-3 transition duration-100 ease-in-out cursor-pointer hover:drop-shadow-md hover:text-green-500 hover:scale-125' />
                    </button>
                  </div>
                  <h2 className='mt-auto text-sm'>
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
              <span className='font-semibold'>Total:</span> {priceFormat(totalPrice)}
            </p>
            <button
              onClick={() => cartStore.setCheckout('checkout')}
              className='w-full py-2 text-white my-4 dark:bg-zinc-100 bg-zinc-900 dark:text-black'
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
            <h2 className='text-lg font-semibold'>Empty Shopping Bag</h2>
          </motion.div>
        )}
      </motion.section>
    </motion.div>
  )
}
