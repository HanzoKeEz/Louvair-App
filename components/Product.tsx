import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { ProductType } from '@/types/ProductType'
import priceFormat from '@/lib/priceFormat'

export default function Product({
  id,
  name,
  image,
  unit_amount,
  description,
  metadata: { features }
}: ProductType) {
  console.log({ id, name, image, unit_amount, description, features })
  // console.log({ id, name, image, unit_amount, features });
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { id, name, image, unit_amount, description, features }
      }}
      className='overflow-hidden border rounded-lg shadow-sm'
    >
      <div className='overflow-hidden'>
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className='object-contain w-full transition-transform duration-300 h-64 hover:scale-105'
          priority
        />
      </div>
      <div className='px-2 py-4 border-4'>
        <h1 className='text-xl font-bold'>{name}</h1>
        <h2 className='text-[15px] font-bold'>{name}</h2>
      </div>
      <div className=''>
        <h2 className='text-sm opacity-80'>
          {unit_amount !== null ? priceFormat(unit_amount) : 'N/A'}
        </h2>
      </div>
    </Link>
  )
}
