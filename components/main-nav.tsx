'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import Logo from '@/public/Logo.png'
import { MainNavItem } from '@/types'
import siteConfig from '@/config/site'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MobileNav } from '@/components/mobile-nav'
import { SidebarOpen, SidebarClose } from 'lucide-react'
import { ThemeToggleButton } from './theme-toggle'
import { AiFillShopping } from 'react-icons/ai'
import { useCartStore } from '@/zustand/store'
import { AnimatePresence, motion } from 'framer-motion'
import Cart from './Cart'

interface MainNavProps {
	items?: MainNavItem[]
	children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
	const cartStore = useCartStore()

	const segment = useSelectedLayoutSegment()
	const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

	const handleBlurOut = () => {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}
	}

	return (
		<>
			<div className='flex gap-6 md:gap-10 w-full justify-between'>
				<Link href='/' className='hidden items-center space-x-2 md:flex'>
					<Image src={Logo} alt={siteConfig.name} width={32} height={32} />
					<span className='hidden font-greatVibes sm:inline-block'>{siteConfig.name}</span>
				</Link>
				{items?.length ? (
					<nav className='hidden gap-6 md:flex'>
						{items?.map((item, index) => (
							<Link
								key={index}
								href={item.disabled ? '#' : item.href}
								className={cn(
									'flex items-center text-md font-thin transition-colors hover:text-foreground/80 sm:text-xs',
									item.href.startsWith(`/${segment}`) ? 'text-foreground' : 'text-foreground/60',
									item.disabled && 'cursor-not-allowed opacity-80'
								)}
							>
								{item.title}
							</Link>
						))}
					</nav>
				) : null}

				<div className='flex items-center space-x-6 md:space-x-10'>
					{/* > If the user is signed in: */}

					<button className='relative text-3xl cursor-pointer' onClick={() => cartStore.toggleCart()}>
						<AiFillShopping />
						<AnimatePresence>
							{/* Required condition when a component is removed from React tree */}
							{cartStore.cart.length > 0 && (
								<motion.span
									animate={{ scale: 1 }}
									initial={{ scale: 0 }}
									exit={{ scale: 0 }}
									className='absolute flex items-center justify-center w-4 h-4 text-xs font-thin text-white rounded-full shadow-md bg-primary left-4 bottom-4'
								>
									{cartStore.cart.length}
								</motion.span>
							)}
						</AnimatePresence>
					</button>
					{/* > If the user is not signed in: */}

					<ThemeToggleButton />

					<Link className='p-4 rounded-md text-sm font-thin hover:bg-black' href={'/dashboard'} onClick={handleBlurOut}>
						My Orders
					</Link>

					<AnimatePresence>
						{/* Required condition when a component is removed from React tree */}
						{cartStore.isOpen && <Cart />}
					</AnimatePresence>
				</div>
				<button className='flex items-center space-x-2 md:hidden' onClick={() => setShowMobileMenu(!showMobileMenu)}>
					{showMobileMenu ? <SidebarClose /> : <SidebarOpen />}
					<span className='font-bold'>Menu</span>
				</button>
				{showMobileMenu && items && <MobileNav items={items}>{children}</MobileNav>}
			</div>
		</>
	)
}
