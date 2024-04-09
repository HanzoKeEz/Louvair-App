import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { ProductType } from '@/types/ProductType'
import priceFormat from '@/lib/priceFormat'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function Product({
  id,
  name,
  image,
  unit_amount,
  description,
  metadata
}: ProductType) {
  console.log({ id, name, image, unit_amount, description, metadata })
  // console.log({ id, name, image, unit_amount, metadata });
  return (
    <Card className='max-w-xs'>
      <Link
        href={{
          pathname: `/product/${id}`,
          query: { id, name, image, unit_amount, description, metadata }
        }}
        className='overflow-hidden border rounded-lg shadow-sm'
      >
        <CardHeader className='bg-gray-100'>
          <CardTitle className='text-xl font-bold'>{name}</CardTitle>
        </CardHeader>
        <div className=''>
          <Image
            src={image}
            alt={name}
            width={800}
            height={800}
            className='object-contain w-full transition-transform duration-300 h-64 hover:scale-105'
            priority
          />
        </div>
        <CardDescription className='px-2 py-4 border-y'>
          <h2 className='text-[15px] font-bold'>{name}</h2>

          <div className=''>
            <h2 className='text-sm opacity-80'>
              {unit_amount !== null ? priceFormat(unit_amount) : 'N/A'}
            </h2>
          </div>
        </CardDescription>
      </Link>
    </Card>
  )
}
