'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './Cart'
import { useCartStore } from '../store'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggleButton } from '@/components/theme-toggle'
import { AiFillShopping } from 'react-icons/ai'
import { Button } from './ui/button'
import Logo from '@/public/Logo.png'
import { linkVariants, navVariants } from './Variants'

const AnimatedLink = motion(Link)
AnimatedLink.defaultProps = { className: 'hover:text-primary nav-link' }

export default function Navbar() {
	const cartStore = useCartStore()
	const { data: session, status } = useSession()

	return (
		<nav className='flex bg-background top-0 sticky w-full z-40 border-b border-neutral-500 h-16'>
			<motion.header
				variants={navVariants}
				initial='hidden'
				animate='visible'
				className='h-full w-full flex justify-between items-center px-3'
			>
				<AnimatedLink href={'/'}>
					<Image src={Logo} alt='Louvair Logo' width={40} height={40} priority />
				</AnimatedLink>

				{/* Dashboard */}
				<div className='flex items-center gap-6'>
					<Link
						className='p-4 rounded-md'
						href={'/dashboard'}
						onClick={() => {
							if (document.activeElement instanceof HTMLElement) {
								document.activeElement.blur()
							}
						}}
					>
						Orders
					</Link>

					{/* Toggle Cart */}
					<div className=''>
						<button
							onClick={() => cartStore.toggleCart()}
							className='flex items-center relative cursor-pointer h-8 w-8'
						>
							<AiFillShopping size={32} />
							<AnimatePresence>
								{cartStore.cart.length > 0 && (
									<motion.span
										animate={{ scale: 1 }}
										initial={{ scale: 0 }}
										exit={{ scale: 0 }}
										className='bg-green-600 text-white dark:text-black text-sm font-bold w-4 h-4 rounded-full absolute left-3 bottom-0 flex items-center justify-center'
									>
										{cartStore.cart.length}
									</motion.span>
								)}
							</AnimatePresence>
						</button>
					</div>

					<div className='flex flex-col h-full justify-center items-center'>
						<motion.div variants={linkVariants}>
							<ThemeToggleButton />
						</motion.div>
					</div>
					<div className=''>
						{!session?.user && (
							<div className=''>
								<Button
									className='bg-zinc-300 hover:bg-zinc-300/50 text-sky-700 font-light uppercase w-20'
									onClick={() => signIn()}
								>
									Sign In
								</Button>
							</div>
						)}
					</div>
					<div className=''>
						{session?.user && (
							<div className='flex items-center justify-center'>
								<div className='relative flex'>
									<Image
										src={session?.user?.image as string}
										alt={session?.user?.name as string}
										width={42}
										height={42}
										className='rounded-full mx-6'
									/>
								</div>

								<Button
									className='dark:bg-zinc-700 dark:hover:bg-zinc-200 hover:bg-zinc-400 dark:text-sky-500 hover:text-red-800 hover:font-normal font-thin tracking-wide duration-300 transition-all w-20 rounded-md'
									onClick={() => {
										signOut()
										if (document.activeElement instanceof HTMLElement) {
											document.activeElement.blur()
										}
									}}
								>
									Sign out
								</Button>
							</div>
						)}
					</div>
					<AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
				</div>
			</motion.header>
		</nav>
	)
}
