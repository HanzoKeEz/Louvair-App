'use client'

import Link from 'next/link'
import Cart from '../Cart'
import { MainNavItem } from '@/types'
import { useCartStore } from '../../zustand/store'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggle } from '@/components/theme-toggle'
import { AiFillShopping } from 'react-icons/ai'
import { Logo } from '@/components/logos/Logo'
import { useSelectedLayoutSegment } from 'next/navigation'
import { cn } from '@/lib/utils'

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export default function Navbar({ children, items }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const cartStore = useCartStore()

  const handleBlurOut = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  return (
    <header className='flex gap-6 md:gap-10 w-full justify-between'>
      <Link href='/'>
        <Logo />
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

      {/* Dashboard */}
      <div className='flex items-center space-x-6 md:space-x-10'>
        {/* > If the user is signed in: */}
        <button
          className='relative text-3xl cursor-pointer'
          onClick={() => cartStore.toggleCart()}
        >
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

        <ThemeToggle />

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

      <Link
        href={'/login'}
        className='hidden md:flex'
      >
        Login
      </Link>
    </header>
  )
}
