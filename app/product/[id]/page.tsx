import Image from 'next/image'
import { SearchParamTypes } from '@/types/SearchParamTypes'
import formatPrice from '@/utils/PriceFormat'
import AddCart from './AddCart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default async function Product({ searchParams }: SearchParamTypes) {
	return (
		<div className='h-full w-full flex justify-center'>
			<Card className='min-w-80 max-w-96 h-full'>
				<CardContent>
					<Image
						src={searchParams.image}
						alt={searchParams.name + searchParams.image}
						width={800}
						height={800}
						className='w-full h-full rounded-md object-cover'
						priority={true}
					/>
				</CardContent>
				<CardHeader className='font-thin tracking-wider '>
					<CardTitle>
						<h1>{searchParams.name}</h1>
					</CardTitle>
				</CardHeader>
				<CardFooter>
					<CardDescription>
						<p className='py-2'>{searchParams.description}</p>
						<p className='py-2'>{searchParams.features}</p>
						<div className='flex gap-2'>
							<p className='font-bold text-primary'>
								{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
							</p>
						</div>

						<AddCart {...searchParams}>Add to cart</AddCart>
					</CardDescription>
				</CardFooter>
			</Card>
		</div>
	)
}
