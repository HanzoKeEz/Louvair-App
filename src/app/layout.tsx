import type { Metadata } from 'next'
import { Inter, Lobster_Two, Roboto } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from 'sonner'

import { Navigation } from '@/components/navigation'
import Hydrate from '@/components/Hydrate'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	variable: '--font-robot',
})
const lobster = Lobster_Two({
	weight: '700',
	subsets: ['latin'],
	variable: '--font-lobster',
})
export const metadata: Metadata = {
	title: 'Larry Ly - Frontend developer',
	description: `I'm a self-taught designer & developer and I aim for smooth engaging user experience.`,
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en' suppressHydrationWarning>
			<Hydrate>
				<body
					className={cn(
						`${roboto.variable} ${lobster.variable} min-h-screen bg-background antialiased  scroll-smooth`
					)}
				>
					<Navigation />
					<div className=''>{children}</div>

					<Toaster position='top-center' richColors />
				</body>
			</Hydrate>
		</html>
	)
}
