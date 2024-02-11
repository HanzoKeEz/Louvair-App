import Image from 'next/image'
import { SearchParamTypes } from '@/types/SearchParamTypes'
import formatPrice from '@/utils/PriceFormat'
import AddCart from './AddCart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default async function Product({ searchParams }: SearchParamTypes) {
	return (
		<div className='h-full w-full border-4 border-black'>
			<Card className='w-1/2 h-1/2'>
				<CardContent>
					<AspectRatio ratio={1}>
						<Image
							src={searchParams.image}
							alt={searchParams.name + searchParams.image}
							width={800}
							height={800}
							className=''
							priority={true}
						/>
					</AspectRatio>

					<CardHeader className='font-thin tracking-wider '>
						<CardTitle>
							<h1 className='text-2xl py-2'>{searchParams.name}</h1>
						</CardTitle>
					</CardHeader>

					<CardDescription>
						<p className='py-2'>{searchParams.description}</p>
						<p className='py-2'>{searchParams.features}</p>
						<div className='flex gap-2'>
							<p className='font-bold text-primary'>
								{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
							</p>
						</div>
					</CardDescription>
				</CardContent>
				<CardFooter>
					<AddCart {...searchParams}>Add to cart</AddCart>
				</CardFooter>
			</Card>
		</div>
	)
}
