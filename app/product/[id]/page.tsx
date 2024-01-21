import Image from 'next/image'
import { SearchParamTypes } from '@/types/SearchParamTypes'
import formatPrice from '@/util/PriceFormat'
import AddCart from './AddCart'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default async function Product({ searchParams }: SearchParamTypes) {
	return (
		<div className='h-full border-4 border-black w-full justify-center items-center'>
			<AspectRatio ratio={16 / 9}>
				<Image
					src={searchParams.image}
					alt={searchParams.name + searchParams.image}
					width={600}
					height={600}
					className='p-4 w-3/4 rounded-md'
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
					<AddCart {...searchParams}>Add to cart</AddCart>
				</div>
			</AspectRatio>
		</div>
	)
}
