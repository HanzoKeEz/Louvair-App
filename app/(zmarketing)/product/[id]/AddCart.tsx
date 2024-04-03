'use client'

import { useCartStore } from '@/zustand/store'
import { AddCartType } from '@/types/AddCartType'
import { useState } from 'react'

export default function AddCart({ name, id, image, unit_amount, quantity }: AddCartType) {
  const cartStore = useCartStore()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    cartStore.addProduct({ id, name, unit_amount, quantity, image })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 1000)
  }
  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className='py-2 bg-neutral-800  rounded-lg border w-full'
      >
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart</span>}
      </button>
    </>
  )
}
