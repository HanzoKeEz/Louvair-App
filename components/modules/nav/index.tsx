import { Suspense } from 'react'

import LocalizedClientLink from '@/components/modules/localized-client-link'
import CartButton from '@/components/modules/cart-button'
import SideMenu from '../../layout/side-menu'

export default async function Nav() {
	return (
		<div className='sticky top-0 inset-x-0 z-50 group'>
			<header className='relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base'>
				<nav className='content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular'>
					<div className='flex-1 basis-0 h-full flex items-center'>
						<div className='h-full'>
							<SideMenu />
						</div>
					</div>

					<div className='flex items-center h-full'>
						<LocalizedClientLink href='/' className='txt-compact-xlarge-plus hover:text-ui-fg-base uppercase'>
							Medusa Store
						</LocalizedClientLink>
					</div>

					<div className='flex items-center gap-x-6 h-full flex-1 basis-0 justify-end'>
						<div className='hidden small:flex items-center gap-x-6 h-full'>
							{process.env.FEATURE_SEARCH_ENABLED && (
								<LocalizedClientLink className='hover:text-ui-fg-base' href='/search' scroll={false}>
									Search
								</LocalizedClientLink>
							)}
							<LocalizedClientLink className='hover:text-ui-fg-base' href='/account'>
								Account
							</LocalizedClientLink>
						</div>
						<Suspense
							fallback={
								<LocalizedClientLink className='hover:text-ui-fg-base flex gap-2' href='/cart'>
									Cart (0)
								</LocalizedClientLink>
							}
						>
							<CartButton />
						</Suspense>
					</div>
				</nav>
			</header>
		</div>
	)
}
