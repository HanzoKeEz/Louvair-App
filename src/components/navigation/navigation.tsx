'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Logo from '../../../public/Logo.png'
import { linkVariants, navVariants } from '@/components/navigation'
import { ThemeToggleButton } from '@/components/theme-toggle-button'
import Image from 'next/image'
import { buttonVariants } from '../ui/button'
import UserAccountNav from '../UserAccountNav'
import Cart from '../Cart'
import { useSession } from 'next-auth/react'
import { useCartStore } from '../../../store'

const AnimatedLink = motion(Link)
AnimatedLink.defaultProps = { className: 'hover:text-primary-brand nav-link' }

export function Navigation() {
	const cartStore = useCartStore()
	const { data: session } = useSession()
	console.log(session?.user)
	const user = session?.user
	return (
		<motion.header
			variants={navVariants}
			initial='hidden'
			animate='visible'
			className='md:flex container fixed inset-x-0 top-0 z-50 items-center justify-between hidden w-full h-20'
		>
			<AnimatedLink href='/#' variants={linkVariants} className=''>
				<Image src={Logo} alt='Larry Logo' width={36} height={36} />
			</AnimatedLink>

			<nav className='gap-x-14 flex items-center justify-center text-sm font-thin'>
				<AnimatedLink href='/#intro' variants={linkVariants}>
					Introduction
				</AnimatedLink>
				<AnimatedLink href='/#projects' variants={linkVariants}>
					Projects
				</AnimatedLink>
				<AnimatedLink href='/#about' variants={linkVariants}>
					About
				</AnimatedLink>
				<AnimatedLink href='/#contact' variants={linkVariants}>
					Contact
				</AnimatedLink>

				<motion.div variants={linkVariants}>
					<ThemeToggleButton />
				</motion.div>
				<div className='ml-auto flex items-center'>
					<div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
						{user ? null : (
							<Link
								href='/sign-in'
								className={buttonVariants({
									variant: 'ghost',
								})}
							>
								Sign in
							</Link>
						)}

						{user ? null : (
							<span className='h-6 w-px bg-gray-200' aria-hidden='true' />
						)}

						{user ? (
							<UserAccountNav user={user} />
						) : (
							<Link
								href='/sign-up'
								className={buttonVariants({
									variant: 'ghost',
								})}
							>
								Sign up
							</Link>
						)}

						{user ? (
							<span className='h-6 w-px bg-gray-200' aria-hidden='true' />
						) : null}

						{user ? null : (
							<div className='flex lg:ml-6'>
								<span className='h-6 w-px bg-gray-200' aria-hidden='true' />
							</div>
						)}

						<div className='ml-4 flow-root lg:ml-6'>
							<Cart />
						</div>
					</div>
				</div>
			</nav>
		</motion.header>
	)
}
