'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { MainNavItem } from '@/types/index'
import { cn } from '@/lib/utils'

import Cart from '../Cart'
import { useCartStore } from '@/zustand/store'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Menu, ShoppingBag, SquareX } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggle } from '../theme-toggle'
import { Button, buttonVariants } from '../ui/button'

import { LogoBrand } from '../logos/LogoBrand'

const AnimatedLink = motion(Link)
AnimatedLink.defaultProps = { className: 'hover:text-primary nav-link' }

interface MainNavProps {
  items?: MainNavItem[]
  user?: { id: string; name: string }
}

export function MainNav({ items, user }: MainNavProps) {
  const cartStore = useCartStore()
  const { data: session, status } = useSession()

  const segment = useSelectedLayoutSegment()

  const handleBlurOut = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  return (
    <div className=''>
      <div className='hidden md:flex md:border-y border-y-0 border-neutral-700 shadow-sm h-[80px]  backdrop-blur-[10px] bg-[rgba(255,255,255,0.1)] z-[900] fixed top-0 left-0 w-full justify-between items-center px-3'>
        <div className='hidden md:flex flex-col items-center justify-center'>
          <Link
            href='/'
            className='hidden md:flex flex-col gap-1 items-center justify-center'
          >
            <LogoBrand />
            <h3 className='text-[10px] tracking-widest text-center mt-1 w-full uppercase sm:text-neutral-500 font-syncopate'>
              L&apos;ouvair
            </h3>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        {/* <div className='flex items-center justify-between md:hidden z-50'>
        <button
          onClick={() => setShowMobileNav((prev) => !prev)}
          className='p-2 text-2xl text-neutral-500'
        >
          {showMobileNav ? <BurgerNav /> : ''}
        </button>
      </div> */}
        <div className='border-black/20 rounded-none px-4 py-2 md:border-y sm:border-y-0 shadow-2xl shadow-neutral-600 translate-x-16'>
          {items?.length ? (
            <nav className='hidden gap-6 md:flex '>
              {items?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  passHref
                  className={cn(
                    'hidden md:flex font-medium font-space yellow-hover tracking-wide uppercase w-24 h-6 justify-center',
                    item.href.startsWith(`/${segment}`) ? 'text-foreground' : 'text-foreground/60',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className='flex items-center'>
          <ul className='flex items-center justify-center gap-6 '>
            <li
              className='relative text-3xl font-assistant cursor-pointer hover:scale-95 duration-200 transition-all ease-in-out shadow-2xl'
              onClick={() => cartStore.toggleCart()}
            >
              <ShoppingBag
                size={28}
                strokeWidth={0.5}
                className=''
              />
              <AnimatePresence>
                {/* Required condition when a component is removed from React tree */}
                {cartStore.cart.length > 0 && (
                  <motion.span
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    exit={{ scale: 0 }}
                    className='absolute flex items-center justify-center w-6 h-6 text-base hover:underline hover:scale-95 duration-300 transition-all ease-in-out shadow-2xl font-normal text-[#3AB795] rounded-full no-underline bg-[#181818] left-4 bottom-4'
                  >
                    {cartStore.cart.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </li>
            {/* > If the user is not signed in: */}

            <li className='flex hovers'>
              <ThemeToggle />
            </li>
            <li className='hidden md:inline-block'>
              {!user && (
                <Link
                  href='/login'
                  className={cn(
                    'hidden md:inline-block font-assistant uppercase relative border-slate-500/50 text-xs tracking-wider',
                    buttonVariants({ variant: 'ghost' })
                  )}
                >
                  Sign in
                </Link>
              )}
              {user && (
                <Button
                  className={cn(
                    'hidden md:inline-block font-assistant uppercase relative text-xs tracking-wider',
                    buttonVariants({ variant: 'ghost', size: 'sm' })
                  )}
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
              )}
            </li>
          </ul>
          <AnimatePresence>
            {/* Required condition when a component is removed from React tree */}
            {cartStore.isOpen && <Cart />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
