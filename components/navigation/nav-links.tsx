'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import { MainNavItem } from '@/types/index'

interface NavLinksProps {
  items?: MainNavItem[]
}

export function NavLinks({ items }: NavLinksProps) {
  const segment = useSelectedLayoutSegments()

  return (
    <div className='border-black/20 rounded-none px-4 py-2 md:border-y sm:border-y-0 shadow-2xl shadow-neutral-600 translate-x-16'>
      {items?.length ? (
        <nav className='gap-6 flex '>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              passHref
              className={cn(
                'flex font-medium font-space yellow-hover tracking-wide uppercase w-24 h-6 justify-center',
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
  )
}
