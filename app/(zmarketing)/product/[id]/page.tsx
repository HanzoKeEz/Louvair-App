import { SearchParamTypes } from '@/types/SearchParamType'
import priceFormat from '@/lib/priceFormat'
import Image from 'next/image'

import AddCartBtn from '@/components/addCartBtn'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import AddCart from './AddCart'

export default async function Product({ searchParams }: SearchParamTypes) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Card className='border border-black w-1/2 rounded-lg'>
        <CardContent>
          <Image
            src={searchParams.image}
            alt={searchParams.name + searchParams.image}
            width={800}
            height={800}
            className='rounded-md object-cover'
            priority={true}
          />

          <CardHeader>
            <CardTitle className='py-6'>
              <h1>{searchParams.name}</h1>
            </CardTitle>
          </CardHeader>
          <p className='py-2'>{searchParams.description}</p>
          <p className='py-2'>{searchParams.features}</p>
          <div className=''>
            <p className='font-bold text-primary'>
              {searchParams.unit_amount && priceFormat(searchParams.unit_amount)}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <AddCart {...searchParams}>Add to cart</AddCart>
        </CardFooter>
      </Card>
    </div>
  )
}
