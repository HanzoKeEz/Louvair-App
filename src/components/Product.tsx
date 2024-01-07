'use client'

import Image from 'next/image'
import formatPrice from '@/util/PriceFormat'
import { ProductType } from '@/types/ProductType'
import Link from 'next/link'
import AddCart from '@/app/product/[id]/AddCart'
import { AddCartType } from '@/types/AddCartType'

export default function Product({
	name,
	image,
	unit_amount,
	id,
	description,
	metadata,
}: ProductType) {
	const { features } = metadata

	return (
		<Link
			href={{
				pathname: `/product/${id}`,
				query: { name, image, unit_amount, id, description, features },
			}}
		>
			<div>
				<Image
					src={image}
					alt={name}
					width={800}
					height={800}
					className='w-full h-96 object-cover rounded-lg'
					priority={true}
				/>
				<div className='font-medium py-2'>
					<h1>{name}</h1>
					<h2 className='text-sm'>
						{unit_amount !== null ? formatPrice(unit_amount) : 'N/A'}
					</h2>
					<AddCart
						id={id}
						name={name}
						image={image}
						unit_amount={unit_amount}
					/>
				</div>
			</div>
		</Link>
	)
}
