'use client'

import { useState, type ComponentPropsWithRef, type FC, useEffect } from 'react'

import type { HTMLMotionProps } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useTheme } from '@/hooks/use-theme'
import { useMounted } from '@/hooks/use-mounted'
import { MoonStar, Sun } from 'lucide-react'

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

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme()
  const mounted = useMounted()

  const isDarkMode = theme === 'dark'

  if (!mounted) return null

  return (
    <AnimatePresence mode='wait'>
      {isDarkMode ? (
        <IconButton
          key='light-mode'
          className='
          hover:text-primary-brand
          text-accent-400
          hover:text-dark-500
          dark:text-dark-300
          dark:hover:text-amber-400 h-8 w-8 ease-in-out'
          onClick={toggleTheme}
        >
          <Sun
            strokeWidth={0.5}
            size={24}
          />
        </IconButton>
      ) : (
        <MoonStar
          key='dark-mode'
          strokeWidth={0.5}
          className='
          hover:text-blue-100 overflow-hidden text-dark-400
          hover:text-dark-500 dark:text-dark-300 dark:hover:text-dark-200 hover:bg-blue-950 rounded-full ease-in-out p-1 h-8 w-8'
          onClick={toggleTheme}
        >
          <MdOutlineDarkMode
            title='Dark mode'
            size={24}
          />
        </MoonStar>
      )}
    </AnimatePresence>
  )
}
