import '../styles/globals.css'
import '../styles/shared.css'
import { Assistant, Great_Vibes, Space_Grotesk, Syncopate } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import { siteConfig } from '@/config/site'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { MainNav } from '@/components/main-nav'
import { Toaster } from '@/components/ui/toaster'
import Hydration from '@/components/Hydration'
import Footer from '@/components/Footer'

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
  const session = await getServerSession()
  return (
    <html
      lang='en'
      className={`${syncopate.className} ${space_grotesk.className} ${greatVibes.className} ${assistant.className} bg-neutral-100 dark:bg-zinc-900 text-neutral-900 dark:text-neutral-100`}
    >
      <Hydration>
        <div className=''>{children}</div>
        <Footer />

        <Toaster />
        <TailwindIndicator />
      </Hydration>
    </html>
  )
}
