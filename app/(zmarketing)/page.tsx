import Product from '@/components/Product'
import getProducts from '@/utils/getProducts'
import Hero from '@/public/Hero.png'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import Carousel from '@/components/native/Carousel'
import { blogPosts, bannersImages } from '@/config/seeder'

export default async function Home() {
	const products = await getProducts()
	console.log(products)

	const blogs = blogPosts
	console.log(blogs)

	const imageBanners = bannersImages.map((images, i) => images.image)
	return (
		<>
			<div className='text-center border-neutral-200 dark:border-neutral-700 flex flex-col items-center'>
				<div className='w-screen'>
					<div className='bg-fixed inset-0 object-cover w-screen'>
						<AspectRatio ratio={16 / 9}>
							<Image src={Hero} alt='Hero Image' className='rounded-sm object-cover ' priority />
							<div className='absolute top-10 left-0 w-full z-10'>
								<h1 className='text-4xl font-greatVibes font-light tracking-wide text-zinc-500 '>Aromatic Bliss</h1>
							</div>
						</AspectRatio>
					</div>
				</div>
				<div className='my-12'>
					<p className='text-zinc-900 max-w-prose font-thin dark:text-zinc-50 text-muted-foreground relative'>
						L&apos;ouvair was founded in 2018 and, early-on, it committed to reinterpret ancient techniques of fine
						craftsmanship to create unexpected air fume for your favorite interior. Each creation carries the legacy of
						centuries of craftsmanship.
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
			<main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6 place-items-center items-center border-4 w-full'>
				{products.map((product) => (
					<Product {...product} key={product.id} />
				))}
			</main>
		</>
	)
}
