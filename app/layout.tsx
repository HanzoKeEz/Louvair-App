import '../styles/globals.css'
import '../styles/shared.css'
import { Assistant, Space_Grotesk, Syncopate } from 'next/font/google'
import Hydrate from '@/components/hydrate'
import { siteConfig } from '@/config/site'
import { ThemeProvider } from '@/components/theme-provider'

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
      name: 'Lit2L',
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
      className={`${syncopate.className} ${assistant.className} ${space_grotesk.className}`}
    >
      <Hydrate>
        <ThemeProvider>
          <main className=''>{children}</main>
        </ThemeProvider>
      </Hydrate>
    </html>
  )
}
