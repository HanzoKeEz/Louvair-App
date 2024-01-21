import { motion } from 'framer-motion'
import Image from 'next/image'
import Logo from '@/public/Logo.png'
import { ThemeToggle } from './theme-toggle'
import { linkVariants, navVariants } from './Variants'
import Link from 'next/link'

export const NavLinks = () => {
	const AnimatedLink = motion(Link)
	AnimatedLink.defaultProps = { className: 'hover:text-primary-brand nav-link' }

	return (
		<motion.header
			variants={navVariants}
			initial='hidden'
			animate='visible'
			className='flex container fixed inset-x-0 top-0 items-center justify-between w-full h-16'
		>
			<AnimatedLink href='/' variants={linkVariants} className=''>
				<Image src={Logo} alt='Louvair Logo' width={36} height={36} />
			</AnimatedLink>

			<section className='gap-x-14 flex items-center justify-center text-sm font-thin'>
				<AnimatedLink href='/#fragrances' variants={linkVariants}>
					Air Ambience
				</AnimatedLink>
				<AnimatedLink href='/pricing' variants={linkVariants}>
					Pricing
				</AnimatedLink>
				<AnimatedLink href='/module' variants={linkVariants}>
					Module Unit
				</AnimatedLink>
				<AnimatedLink href='/#about' variants={linkVariants}>
					About
				</AnimatedLink>

				<motion.div variants={linkVariants}>
					<ThemeToggle />
				</motion.div>
			</section>
		</motion.header>
	)
}
