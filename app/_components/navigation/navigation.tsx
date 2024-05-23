'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Logo from '@/app/_components/logo'
import { linkVariants, navVariants } from '@/app/_components/navigation'
import { ThemeToggleButton } from '@/app/_components/theme-toggle-button'
import { MainNavItem } from '@/types'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useCartStore } from '@/zustand/store'
import { AiFillShopping } from 'react-icons/ai'
import Cart from '@/components/Checkout/Cart'

const AnimatedLink = motion(Link)
AnimatedLink.defaultProps = { className: 'hover:text-primary-brand nav-link font-bold' }

interface NavigationProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function Navigation({ children, items }: NavigationProps) {
  const segment = useSelectedLayoutSegment()
  const cartStore = useCartStore()

  const handleBlurOut = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }
  return (
    <motion.header
      variants={navVariants}
      initial='hidden'
      animate='visible'
      className='flex gap-6 md:gap-10 w-full justify-between'
    >
      {/* {items?.length ? (
        <nav className='flex items-center justify-center gap-x-14 text-lg'>
          {items.map((item) => (
            <AnimatedLink
              key={item.id}
              href={item.href}
              variants={linkVariants}
            >
              {item.title}
            </AnimatedLink>
          ))}
        </nav>
      ) : ( */}
        <nav className='flex items-center justify-center gap-x-14 text-lg'>
          <AnimatedLink
            href='/#intro'
            variants={linkVariants}
          >
            Introduction
          </AnimatedLink>
          <AnimatedLink
            href='/#projects'
            variants={linkVariants}
          >
            Projects
          </AnimatedLink>
          <AnimatedLink
            href='/#about'
            variants={linkVariants}
          >
            About
          </AnimatedLink>
          <AnimatedLink
            href='/#contact'
            variants={linkVariants}
          >
            Contact
          </AnimatedLink>

          <motion.div variants={linkVariants}>
            <ThemeToggleButton />
          </motion.div>
          <AnimatePresence>
            <div className='flex items-center space-x-6 md:space-x-10'>
              {/* > If the user is signed in: */}
              <button
                className='relative text-3xl cursor-pointer'
                onClick={() => cartStore.toggleCart()}
              >
                <AiFillShopping />

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
              </button>
              <Link
                className='p-4 rounded-md text-sm font-thin hover:bg-black'
                href={'/dashboard'}
                onClick={handleBlurOut}
              >
                Orders
              </Link>

              <AnimatePresence>
                {/* Required condition when a component is removed from React tree */}
                {cartStore.isOpen && <Cart />}
              </AnimatePresence>
            </div>
          </AnimatePresence>
        </nav>
      )}
    </motion.header>
  )
}
