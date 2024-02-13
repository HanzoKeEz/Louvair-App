'use client'

import { MobileNav } from '@/components/native//nav/mobile'
import { UserAccountNav } from '@/components/UserAccountNav'
import { MainNav } from '@/components/native/nav/desktop'
import { Button } from '@/components/ui/button'

import { LogIn, Moon, ShoppingBag, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { CommandMenu } from '@/components/CommandMenu'

export default function Header() {
	return (
		<header className='supports-backdrop-blur:bg-background/90 sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur mb-4 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]'>
			<div className='flex h-14 items-center'>
				<MainNav />
				<MobileNav />
				<div className='flex flex-1 items-center space-x-2 justify-end'>
					<div className='flex-none'>
						<CommandMenu />
					</div>
					<CartNav />
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}

export function CartNav() {
	return (
		<Link href='/cart'>
			<Button size='icon' variant='outline' className='h-9'>
				<ShoppingBag className='h-4' />
			</Button>
		</Link>
	)
}

function LoginDialog() {
	return (
		<Link href='/login'>
			<Button className='font-medium flex gap-2'>
				<LogIn className='h-4' />
				<p>Login</p>
			</Button>
		</Link>
	)
}

function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()

	return (
		<Button variant='outline' size='icon' onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
			{resolvedTheme === 'dark' ? <Sun className='h-4' /> : <Moon className='h-4' />}
		</Button>
	)
}
