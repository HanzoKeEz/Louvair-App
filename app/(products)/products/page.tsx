import { BlogPostCard, BlogPostGrid, BlogPostSkeletonGrid } from '@/components/native/BlogCard'
import Carousel from '@/components/native/Carousel'
import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Products'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/ui/separator'
import { isVariableValid } from '@/lib/utils'
import { blogPosts, bannersImages, nativeProducts } from '@/config/seeder'
import { ProductWithIncludes } from '@/types/prisma'

export default async function Index() {
	// const products = nativeProducts.map((product) => product)
	const products = nativeProducts

	const blogs = blogPosts

	const imageBanners = bannersImages.map((images, i) => images.image)

	return (
		<div className='flex flex-col border-neutral-200 dark:border-neutral-700'>
			<Carousel images={imageBanners} />
			<Separator className='my-8' />
			<Heading title='Products' description='Below is a list of products we have available for you.' />
			<ProductGrid products={products} />
			<Separator className='my-8' />
			<BlogPostGrid />
		</div>
	)
}
