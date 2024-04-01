import * as React from 'react'

import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { LogoBuilder } from './logos/LogoBuilder'
import { Separator } from './ui/separator'

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className='py-6 px-3 h-full font-assistant bg-secondary w-screen flex  items-center justify-between gap-4 md:flex-row md:py-0'>
        <div className='flex flex-col items-center justify-evenly w-full gap-4 md:flex-row tracking-widest'>
          <div className='flex gap-3 items-center '>
            <p className='text-center text-sm leading-loose md:text-left'>
              Powered by Research & Technology{' '}
            </p>
            <ThemeToggle />
          </div>
          <div className=''>
            <span className='font-medium text-sm flex items-center py-3 gap-3'>
              Built by <LogoBuilder className='h-3 w-3' />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
