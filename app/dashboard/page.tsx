import formatPrice from '@/utils/PriceFormat'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { prisma } from '@/utils/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { OrderType } from '@/types/OrderType'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ProductType } from '@/types/ProductType'

const fetchOrders = async () => {
	const user = await getServerSession(authOptions)
	if (!user) {
		return { message: 'Not authenticated' }
	}
	const orders = await prisma.order.findMany({
		where: {
			userId: user?.user?.id,
		},
		include: {
			products: true,
		},
	})
	return orders
}

export default async function Dashboard() {
	const orders = await fetchOrders()
	if (orders === null) return <p>You need to be logged in to view your orders</p>

	// if (orders) {
	// 	console.log(orders)
	// 	return (
	// 		<div className=''>
	// 			<h1 className='text-2xl'>No orders yet</h1>
	// 		</div>
	// 	)
	// }

	return (
		<div className=''>
			<div className='font-medium'>
				{orders.map((order: OrderType) => (
					<div key={order.id} className='rounded-lg p-8 my-4 space-y-2 bg-zinc-600 '>
						<h2 className='text-xs font-medium'>Order reference: {order.id}</h2>
						<p className='text-xs'>
							Status:
							<span
								className={`${
									order.status === 'complete' ? 'bg-green-500' : 'bg-sky-600'
								} text-white py-1 rounded-md px-2 mx-2 text-xs capitalize`}
							>
								{order.status}
							</span>
						</p>
						<p className='text-xs pb-3'>Time: {new Date(order.createdDate).toString()}</p>
						<div className='text-sm flex items-center gap-4'>
							{order.products.map((product: ProductType) => (
								<Card className='h-64 w-44 bg-zinc-800/70 flex flex-col justify-center' key={product.id}>
									<CardHeader className=''>
										<CardTitle className='font-light text-center text-sm'>{product.name}</CardTitle>
									</CardHeader>
									<CardContent>
										<AspectRatio>
											<Image src={product.image!} fill alt={product.name} priority={true} className='' />
										</AspectRatio>
									</CardContent>
									<CardFooter className='flex flex-col font-light text-xs'>
										<p>{formatPrice(product.unit_amount!)}</p>
										<p className=''>Quantity: {product.quantity}</p>
									</CardFooter>
								</Card>
							))}
						</div>
						<p className='font-medium py-2'>Total: {formatPrice(order.amount)}</p>
					</div>
				))}
			</div>
		</div>
	)
}
