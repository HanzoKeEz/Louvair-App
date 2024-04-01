import { SearchParamTypes } from '@/types/SearchParamType'
import priceFormat from '@/lib/priceFormat'
import Image from 'next/image'

import AddCartBtn from '@/components/addCartBtn'
import { Card } from '@/components/ui/card'

export default async function ProductPage({ searchParams }: SearchParamTypes) {
  // console.log('searchParams: ', searchParams);
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
      <Card className='flex flex-col justify-center items-center gap-8 md:flex-row p-6'>
        <div className=''>
          <Image
            src={searchParams.image}
            alt={searchParams.name}
            width={600}
            height={600}
            className='object-cover w-full h-96 rounded-lg '
            priority={true}
          />
        </div>

        <article className='flex flex-col'>
          <div>
            <h1 className='py-2 text-2xl font-medium'>{searchParams.name}</h1>
            {/* <p className="py-2">{searchParams.description}</p> */}
            <p className='py-2'>{searchParams.features}</p>
            <p className='px-2 py-2 text-sm rounded w-fit bg-base-200'>
              {searchParams.unit_amount && priceFormat(searchParams.unit_amount)}
            </p>
          </div>
          <AddCartBtn {...searchParams} />
        </article>
      </Card>
    </div>
  )
}
