import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { Providers } from '@/components/Providers'
import clsx from 'clsx'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Larry Ly - Frontend developer',
	description: `I'm a self-taught designer & developer and I aim for smooth engaging user experience.`,
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang='en'
			className='scroll-p-32 scroll-smooth'
			suppressHydrationWarning
		>
			<body
				className={clsx(
					'bg-dark-50 text-dark-600 transition-colors duration-300 ease-in-out dark:bg-dark-850 dark:text-dark-50',

					inter.className
				)}
			>
				<Providers>
					<Navigation />
					<div className='flex-grow flex-1 '>{children}</div>
				</Providers>

				<Toaster position='top-center' richColors />
			</body>
		</html>
	)
}
