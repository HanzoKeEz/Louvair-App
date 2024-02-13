import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/Heading'
import Link from 'next/link'

const Hero = () => {
	return (
		<div className='h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle'>
			<div className='absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6'>
				<span>
					<h1 className='text-3xl leading-10 text-ui-fg-base font-normal'>Ecommerce Starter Template</h1>
					<h2 className='text-3xl leading-10 text-ui-fg-subtle font-normal'>Powered by Medusa and Next.js</h2>
				</span>
				<Link href='https://github.com/medusajs/nextjs-starter-medusa' target='_blank'>
					<Button variant='secondary'>
						View on GitHub
						<Github />
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default Hero
