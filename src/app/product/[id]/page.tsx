import Image from 'next/image'
import { SearchParamTypes } from '@/types/SearchParamTypes'
import formatPrice from '@/lib/PriceFormat'
import AddCart from './AddCart'

export default async function Product({ searchParams }: SearchParamTypes) {
	return (
		<div className='flex flex-col items-center justify-between gap-16 h-full w-full'>
			<Image
				src={searchParams.image}
				alt={searchParams.name}
				width={600}
				height={600}
				className='rounded-lg w-96 h-96'
				priority={true}
			/>

			<div className='font-thin tracking-wider '>
				<h1 className='text-2xl py-2'>{searchParams.name}</h1>
				<p className='py-2'>{searchParams.description}</p>
				<p className='py-2'>{searchParams.features}</p>
				<div className='flex gap-2'>
					<p className='font-bold text-primary'>
						{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
					</p>
				</div>
				<AddCart {...searchParams} />x
			</div>
		</div>
	)
}

// Climate = .04% co2 or 417 ppm
// c02 =
