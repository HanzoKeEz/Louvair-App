'use client'

import { useState, type ComponentPropsWithRef, type FC, useEffect } from 'react'

import type { HTMLMotionProps } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useTheme } from '@/hooks/use-theme'
import { useMounted } from '@/hooks/use-mounted'
import { useThemeStore } from '@/zustand/store'

type IconButtonProps = HTMLMotionProps<'button'> & ComponentPropsWithRef<'button'>
const IconButton: FC<IconButtonProps> = ({ children, ...props }) => (
	<motion.button
		{...props}
		initial={{ opacity: 0, rotate: -65, originY: '150%', originX: 0.5 }}
		animate={{ opacity: 1, rotate: 0 }}
		exit={{ opacity: 0, rotate: 65 }}
		transition={{ duration: 0.4, ease: 'backOut' }}
	>
		{children}
	</motion.button>
)
IconButton.displayName = 'IconButton'

export const ThemeToggleButton: FC = () => {
	const { theme, toggleTheme } = useTheme()
	const themeStore = useThemeStore()
	const mounted = useMounted()

	const handleClick = () => {
		if (themeStore.mode === 'dark') themeStore.toggleTheme('light')
		if (themeStore.mode === 'light') themeStore.toggleTheme('dark')
	}

	const isDarkMode = theme === 'dark'

	if (!mounted) return null

	return (
		<AnimatePresence mode='wait'>
			{isDarkMode ? (
				<IconButton
					key='light-mode'
					className='hover:text-primary-brand overflow-hidden text-dark-400 hover:text-dark-500 dark:text-dark-300 dark:hover:text-dark-200'
					onClick={toggleTheme}
				>
					<MdOutlineLightMode title='Light mode' size={24} />
				</IconButton>
			) : (
				<IconButton
					key='dark-mode'
					className='hover:text-primary-brand overflow-hidden text-dark-400 hover:text-dark-500 dark:text-dark-300 dark:hover:text-dark-200'
					onClick={toggleTheme}
				>
					<MdOutlineDarkMode title='Dark mode' size={24} />
				</IconButton>
			)}
		</AnimatePresence>
	)
}

/* <Button
				variant='ghost'
				size='icon'
				onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			>
				<Sun className='h-[1.5rem] w-[1.3rem] dark:hidden' />
				<Moon className='hidden h-5 w-5 dark:block' />
				<span className='sr-only'>Toggle theme</span>
			</Button>
		</AnimatePresence>
	)
} */
