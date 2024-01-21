import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Hydrate from '@/components/Hydrate'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemesProvider } from '@/components/theme-provider'
import { Lobster_Two, Roboto } from 'next/font/google'

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

interface RootLayoutProps {
	children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<html className={`${roboto.variable} ${lobster.variable}  `} lang='en'>
			<Hydrate>
				<ThemesProvider>
					<Navbar />
					{children}
				</ThemesProvider>
				<TailwindIndicator />
			</Hydrate>
		</html>
	)
}
