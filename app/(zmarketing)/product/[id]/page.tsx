import { SearchParamTypes } from '@/types/SearchParamType'
import priceFormat from '@/lib/priceFormat'
import Image from 'next/image'

import AddCartBtn from '@/components/addCartBtn'
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card'

export default async function ProductPage({ searchParams }: SearchParamTypes) {
  // console.log('searchParams: ', searchParams);
  return (
    <div className='w-full min-h-screen flex flex-col items-center mt-20'>
      <Card className='flex flex-col  gap-8 md:flex-row p-12'>
        <CardContent className=''>
          <Image
            src={searchParams.image}
            alt={searchParams.name}
            width={800}
            height={800}
            className='object-cover w-full h-72 rounded-lg '
            priority={true}
          />
        </CardContent>
        <CardDescription className=''>
          <article className='flex flex-col justify-center items-center'>
            <div className='text-center'>
              <h1 className='text-2xl font-medium'>{searchParams.name}</h1>
              <p className=''>{searchParams.description}</p>
              <p className=''>{searchParams.features}</p>
              <p className='py-2 text-lg rounded'>
                {searchParams.unit_amount && priceFormat(searchParams.unit_amount)}
              </p>
            </div>
            <CardFooter>
              <AddCartBtn {...searchParams} />
            </CardFooter>
          </article>
        </CardDescription>
      </Card>
    </div>
  )
}
