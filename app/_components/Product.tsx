import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { ProductType } from '@/types/ProductType'
import priceFormat from '@/lib/priceFormat'
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

export default function Product({ id, name, unit_amount, image, description }: ProductType) {
  console.log({ id, name, image, unit_amount, description })
  // console.log({ id, name, image, unit_amount, });
  return (
    <Card className='w-[320px]'>
      <Link
        href={{
          pathname: `/product/${id}`,
          query: { id, name, image, unit_amount, description }
        }}
        className='border rounded-lg shadow-sm'
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
