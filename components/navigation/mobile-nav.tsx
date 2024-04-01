import * as React from 'react'
import Link from 'next/link'

import { MainNavItem } from '@/types'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { LogoBrand } from '../logos/LogoBrand'

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
}

export function MobileNav({ items, children }: MobileNavProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden bg-black'
      )}
    >
      <div className='relative z-20 grid gap-6 rounded-md bg-neutral-800 text-neutral-100 p-4 text-popover-foreground shadow-2xl'>
        <Link
          href='/'
          className='flex flex-col'
        >
          <LogoBrand />
          <span className='my-1 text-center'>{siteConfig.name}</span>
        </Link>
        <nav className='grid grid-flow-row auto-rows-max text-sm'>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-lg font-light tracking-widest hover:underline font-sans ',
                item.disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  )
}
