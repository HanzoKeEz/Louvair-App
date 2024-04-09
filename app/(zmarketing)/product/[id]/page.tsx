import { SearchParamTypes } from '@/types/SearchParamType'
import priceFormat from '@/lib/priceFormat'
import Image from 'next/image'

import AddCartBtn from '@/components/Checkout/addCartBtn'
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
    <div className='w-full h-full flex justify-center items-center m-6'>
      <Card className='border border-black w-1/2 rounded-lg text-left'>
        <CardContent>
          <Image
            src={searchParams.image}
            alt={searchParams.name + searchParams.image}
            width={800}
            height={800}
            className='rounded-md object-contain'
            priority={true}
          />

          <CardHeader>
            <CardTitle className='text-left text-xl'>
              <h1>{searchParams.name}</h1>
            </CardTitle>
          </CardHeader>
          <p className='py-2'>{searchParams.description}</p>
          <p className='py-2'>{searchParams.features}</p>
          <div className=''>
            <p className='font-bold text-xl'>
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
