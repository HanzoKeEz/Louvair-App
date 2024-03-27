import * as React from 'react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { ThemeToggle } from '@/components/theme-toggle'

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className='container font-assistant bg-zinc-400 w-screen flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0'>
        <div className='flex flex-col items-center w-full gap-4 md:flex-row md:gap-2 '>
          <Icons.logo />
          <p className='text-center text-sm leading-loose md:text-left'>
            Built by{' '}
            <a
              href={siteConfig.links.instagram}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              shadcn
            </a>
            . Hosted on{' '}
            <a
              href='https://vercel.com'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              Vercel
            </a>
            . Illustrations by{' '}
            <a
              href='https://popsy.co'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              Popsy
            </a>
            . The source code is available on{' '}
            <a
              href={siteConfig.links.facebook}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  )
}
