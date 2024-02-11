import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Hydrate from '@/components/Hydrate'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Lobster_Two, Roboto } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { ThemeProvider } from '@/components/theme-provider'

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
	const session = await getServerSession(authOptions)
	return (
		<html className={`${roboto.variable} ${lobster.variable}  `} lang='en-us' suppressHydrationWarning>
			<Hydrate>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<Navbar />
					{children}

					<TailwindIndicator />
				</ThemeProvider>
			</Hydrate>
		</html>
	)
}
