import Image from 'next/image'
import Hero from '../../public/louvair4.png'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import getProducts from '@/lib/getProducts'
import Product from '@/components/Product'

// const perks = [
// 	{
// 		name: 'Instant Delivery',
// 		Icon: ArrowDownToLine,
// 		description: 'Get your assets delivered instantly after purchase.',
// 	},

// 	{
// 		name: 'Guaranteed Quality',
// 		Icon: CheckCircle,
// 		description:
// 			'Every asset on our platform is verified by our team to ensure our highest quality standards.',
// 	},
// 	{
// 		name: 'For the Planet',
// 		Icon: Leaf,
// 		description: 'We only charge a 10% fee on sales.',
// 	},
// ]

export default async function Home() {
	const products = await getProducts()

	return (
		<>
			<MaxWidthWrapper>
				<div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
					<div className='relative w-screen'>
						<div className='bg-fixed bg-transparent inset-0 object-cover w-screen'>
							<AspectRatio ratio={16 / 9}>
								<Image
									src={Hero}
									alt='DigitalHippo'
									className='rounded-sm object-cover'
								/>
							</AspectRatio>
							<div className='absolute top-0 left-0 mt-6 w-full'>
								<h1 className='text-4xl font-light tracking-wide text-zinc-700'>
									Aromatic Bliss
									<br />
									<span className='text-amber-700 font-extralight uppercase text-lg'>
										Air Ambience
									</span>
								</h1>
							</div>
						</div>
					</div>
					<div className='my-6'>
						<p className=' text-lg max-w-prose text-muted-foreground relative'>
							L&apos;ouvair was founded in 2018 and, early-on, it committed to
							reinterpret ancient techniques of fine craftsmanship to create
							unexpected air fume for your favorite interior. Each creation
							carries the legacy of centuries of craftsmanship.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 mt-6'>
							<Link href='/products' className={buttonVariants()}>
								Browse Trending
							</Link>
							<Button variant='ghost'>Our quality promise &rarr;</Button>
						</div>
					</div>
				</div>
				<section className='grid grid-cols-fluid gap-12'>
					{products.map((product) => (
						<Product {...product} key={product.id} />
					))}
				</section>
			</MaxWidthWrapper>
		</>
	)
}
