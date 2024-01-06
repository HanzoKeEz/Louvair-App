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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Label } from '../ui/label'
import { useState } from 'react'
import DropMenu from '../DropMenu'

const AnimatedLink = motion(Link)
AnimatedLink.defaultProps = { className: 'hover:text-primary-brand nav-link' }

export function Navigation() {
	const [label, setLabel] = useState('Orders')
	const [open, setOpen] = useState(false)

	const cartStore = useCartStore()
	const { data: session, status } = useSession()

	const labels = ['Orders', 'Profile', 'Settings', 'Sign out']
	const menuItems = []
	return (
		<nav className='sticky top-0 w-screen h-16 z-50 mb-16'>
			<motion.header
				variants={navVariants}
				initial='hidden'
				animate='visible'
				className='flex container fixed inset-x-0 top-0 items-center justify-between w-full h-20 border'
			>
				<AnimatedLink href='/' variants={linkVariants} className=''>
					<Image src={Logo} alt='Louvair Logo' width={36} height={36} />
				</AnimatedLink>

				<section className='gap-x-14 flex items-center justify-center text-sm font-thin'>
					<AnimatedLink href='/#fragrances' variants={linkVariants}>
						Air Ambience
					</AnimatedLink>
					<AnimatedLink href='/#machines' variants={linkVariants}>
						Pricing
					</AnimatedLink>
					<AnimatedLink href='/#pricing' variants={linkVariants}>
						Module
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
									className='bg-zinc-500 text-white dark:text-black text-sm font-bold w-5 h-5 rounded-full absolute left-5 border bottom-4 flex items-center justify-center'
								>
									{cartStore.cart.length}
								</motion.span>
							)}
						</AnimatePresence>
					</li>

					{/* If the user is not signed in */}
					{!session?.user && (
						<li className='text-white py-2 px-4 rounded-md'>
							<button onClick={() => signIn()}>Sign in</button>
						</li>
					)}

					{session?.user && (
						<div className=' flex items-center justify-center gap-6 mx-auto'>
							<div className=''>
								<DropMenu />
							</div>
							{/* <Button
								className=''
								onClick={() => {
									if (document.activeElement instanceof HTMLElement) {
										document.activeElement.blur()
									}
								}}
							>
								Orders
							</Button>
							<Button
								onClick={() => {
									signOut()
									if (document.activeElement instanceof HTMLElement) {
										document.activeElement.blur()
									}
								}}
								className=''
							>
								Sign out
							</Button> */}
						</div>
					)}
				</ul>
			</motion.header>

			<AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
		</nav>
	)
}
