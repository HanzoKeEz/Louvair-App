'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { cn } from '@/lib/utils'

import Cart from '../../../components/Checkout/Cart'
import { useCartStore } from '@/zustand/store'
import { Menu, ShoppingBag, SquareX } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggleButton } from '../theme-toggle-button'
import { Button, buttonVariants } from '../../../components/ui/button'
import Logo from '../logo'
import { UserAccountNav } from '@/components/user-account-nav'
import { SignInButton } from '../SignInButton'

const navlinks = [
  {
    id: 0,
    title: 'Featured',
    href: '/'
  },
  {
    id: 1,
    title: 'Pricing',
    href: '/pricing'
  },
  {
    id: 2,
    title: 'Dashboard',
    href: '/dashboard'
  }
]

const AnimatedLink = motion(Link)
AnimatedLink.defaultProps = { className: 'hover:text-primary nav-link' }

export function MainNav() {
  const segment = useSelectedLayoutSegment()
  const cartStore = useCartStore()

  const links = navlinks

  const handleBlurOut = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  // useSession() returns a session object with the following properties:
  // - data: The session object returned by the server.
  // - status: The loading status of the session.
  // - error: The error object if the session failed to load.
  // -used to check if the user is signed in or not
  // -render the sign in button when no session and  or sign out when user is session

  return (
    <div className='max-w-7xl container'>
      <div className='hidden md:flex md:border-y border-y-0 border-neutral-700 shadow-sm h-[80px]  backdrop-blur-[10px] bg-[rgba(255,255,255,0.5)] z-[900] fixed top-0 left-0 w-full justify-between items-center pl-3 pr-20'>
        <div className='flex flex-col items-center justify-center'>
          <Link
            href='/'
            className='hidden md:flex flex-col gap-1 items-center justify-center'
          >
            <Logo />
          </Link>
        </div>

        <div className='border-black/20 rounded-none px-4 py-2 md:border-y sm:border-y-0 shadow-2xl shadow-neutral-600 translate-x-16'>
          {links?.length ? (
            <nav className='hidden gap-6 md:flex '>
              {links?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  passHref
                  className={cn(
                    'hidden md:flex  text-sm font-light font-space yellow-hover tracking-wide uppercase w-24 h-6 justify-center',
                    item.href.startsWith(`/${segment}`) ? 'text-foreground' : 'text-foreground/60',
                    item.href && ' opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className='hidden md:flex items-center mr-16 pr-16'>
          <ul className='flex items-center justify-start gap-6 '>
            <li
              className=' relative text-3xl font-assistant cursor-pointer hover:scale-95 duration-200 transition-all ease-in-out shadow-2xl'
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
          </ul>
          <div className='flex ml-6 items-center'>
            <AnimatePresence>
              {/* Required condition when a component is removed from React tree */}

              {cartStore.isOpen && <Cart />}
              <ThemeToggleButton />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
