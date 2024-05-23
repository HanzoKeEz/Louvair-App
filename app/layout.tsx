import '../styles/globals.css'
import '../styles/shared.css'
import { Assistant, Great_Vibes, Space_Grotesk, Syncopate } from 'next/font/google'
import { siteConfig } from '@/config/site'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { MainNav } from '@/app/_components/navigation/main-nav'
import { Toaster } from '@/components/ui/toaster'
import Hydration from '@/app/_components/Hydration'
import Footer from '@/components/Footer'
import { MobileNav } from './_components/navigation/mobile-navigation'

const syncopate = Syncopate({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-syncopate'
})

const space_grotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space'
})
const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-greatVibes'
})

const assistant = Assistant({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable'
})

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
  authors: [
    {
      name: 'Li2L',
      url: 'https://lit2l.com'
    }
  ],
  creator: 'lit2l',

  icons: {
    icon: '/assets/Logo.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: `${siteConfig.url}/site.webmanifest`
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      className={`font-sans text-text bg-background ${syncopate} ${space_grotesk} ${greatVibes} ${assistant}`}
      suppressHydrationWarning
    >
      <Hydration>
        <header className='sticky flex items-center h-20 px-6 z-40 border-b bg-background'>
          <MainNav />
          <MobileNav />
        </header>
        <div className=''>
          {children}
          <Footer />
        </div>

        <Toaster />
        <TailwindIndicator />
      </Hydration>
    </html>
  )
}
