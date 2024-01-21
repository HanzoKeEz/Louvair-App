import Product from '@/components/Product'
import getProducts from '@/util/getProducts'
import Hero from '@/public/louvair4.png'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'

export default async function Home() {
	const products = await getProducts()
	console.log(products)

	return (
		<>
			<div className='mx-auto text-center flex flex-col items-center max-w-3xl'>
				<div className='w-screen'>
					<div className='bg-fixed inset-0 object-cover w-screen'>
						<AspectRatio ratio={16 / 9}>
							<Image src={Hero} alt='Hero Image' className='rounded-sm object-cover ' priority />
							<div className='absolute top-20 left-0 mt-6 w-full z-10'>
								<h1 className='text-4xl font-light tracking-wide text-zinc-700 '>
									Aromatic Bliss
									<br />
									<span className='text-sky-600 font-light uppercase text-xl pt-6'>
										Air Ambience
									</span>
								</h1>
							</div>
						</AspectRatio>
					</div>
				</div>
				<div className='my-12'>
					<p className='text-zinc-900 max-w-prose font-thin dark:text-zinc-50 text-muted-foreground relative'>
						L&apos;ouvair was founded in 2018 and, early-on, it committed to reinterpret ancient
						techniques of fine craftsmanship to create unexpected air fume for your favorite
						interior. Each creation carries the legacy of centuries of craftsmanship.
					</p>
					<div className='flex justify-center gap-6 mt-6'>
						<Link
							href='/products'
							className={buttonVariants({
								variant: 'default',
								className:
									'bg-zinc-700 hover:bg-zinc-600/50 dark:hover:bg-zinc-200 dark:text-sky-500 hover:text-sky-800 font-extralight tracking-wider duration-200 transition-all w-36 rounded-md',
							})}
						>
							Browse Trending
						</Link>
						{/* <Button onClick={() => signIn()}>Get Started</Button> */}
					</div>
				</div>
			</div>
			<main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6'>
				{products.map((product) => (
					<Product {...product} key={product.id} />
				))}
			</main>
		</>
	)
}
