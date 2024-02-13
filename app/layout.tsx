import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Hydrate from '@/components/Hydrate'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Be_Vietnam_Pro, Great_Vibes } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

const vietnam = Be_Vietnam_Pro({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: '--font-vietnam',
})
// const lobster = Lobster_Two({
// 	weight: '700',
// 	subsets: ['latin'],
// 	variable: '--font-lobster',
// })

const greatVibes = Great_Vibes({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-greatVibes',
})

interface RootLayoutProps {
	children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const session = await getServerSession(authOptions)
	return (
		<html className={`${vietnam.variable} ${greatVibes.variable} `} lang='en' suppressHydrationWarning>
			<Hydrate>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<div className='mt-6'>{children}</div>
					<TailwindIndicator />
					<Toaster />
				</ThemeProvider>
			</Hydrate>
		</html>
	)
}
