'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Logo from '../../../public/Logo.png'
import { linkVariants, navVariants } from '@/components/navigation'
import { ThemeToggleButton } from '@/components/theme-toggle-button'
import Image from 'next/image'
import { AiFillShopping } from 'react-icons/ai'
import Cart from '../Cart'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useCartStore } from '../../../store'
import { Button } from '../ui/button'

const AnimatedLink = motion(Link)
AnimatedLink.defaultProps = { className: 'hover:text-primary-brand nav-link' }

export function Navigation() {
	const cartStore = useCartStore()
	const { data: session, status } = useSession()

	return (
		<nav className='sticky top-0 z-40 w-full border-b'>
			<motion.header
				variants={navVariants}
				initial='hidden'
				animate='visible'
				className='flex container fixed inset-x-0 top-0 z-50 items-center justify-between  w-full h-20'
			>
				<AnimatedLink href='/#' variants={linkVariants} className=''>
					<Image src={Logo} alt='Larry Logo' width={36} height={36} />
				</AnimatedLink>

				<section className='gap-x-14 flex items-center justify-center text-sm font-thin'>
					<AnimatedLink href='/#products' variants={linkVariants}>
						Products
					</AnimatedLink>
					<AnimatedLink href='/#pricing' variants={linkVariants}>
						Pricing
					</AnimatedLink>
					<AnimatedLink href='/#about' variants={linkVariants}>
						About
					</AnimatedLink>

					<motion.div variants={linkVariants}>
						<ThemeToggleButton />
					</motion.div>
				</section>
				<ul className='flex items-center gap-8'>
					{/* Toggle the cart */}

					<li
						onClick={() => cartStore.toggleCart()}
						className='flex items-center text-3xl relative cursor-pointer'
					>
						<AiFillShopping />
						<AnimatePresence>
							{cartStore.cart.length > 0 && (
								<motion.span
									animate={{ scale: 1 }}
									initial={{ scale: 0 }}
									exit={{ scale: 0 }}
									className='bg-primary text-white dark:text-black text-sm font-bold w-5 h-5 rounded-full absolute left-8 border bottom-4 flex items-center justify-center'
								>
									{cartStore.cart.length}
								</motion.span>
							)}
						</AnimatePresence>
					</li>

					{/* If the user is not signed in */}
					{!session?.user && (
						<li className='bg-primary text-white py-2 px-4 rounded-md'>
							<button onClick={() => signIn()}>Sign in</button>
						</li>
					)}

					{session?.user && (
						<li>
							<div className='dropdown dropdown-end cursor-pointer'>
								<Image
									src={session.user?.image as string}
									alt={session.user.name as string}
									width={36}
									height={36}
									className='rounded-full'
									tabIndex={0}
								/>
								<ul
									tabIndex={0}
									className='dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72'
								>
									<Link
										className='hover:bg-base-300 p-4 rounded-md'
										href={'/dashboard'}
										onClick={() => {
											if (document.activeElement instanceof HTMLElement) {
												document.activeElement.blur()
											}
										}}
									>
										Orders
									</Link>
									<li
										onClick={() => {
											signOut()
											if (document.activeElement instanceof HTMLElement) {
												document.activeElement.blur()
											}
										}}
										className='hover:bg-base-300 p-4 rounded-md'
									>
										Sign out
									</li>
								</ul>
							</div>
						</li>
					)}
				</ul>
			</motion.header>
			<AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
		</nav>
	)
}
