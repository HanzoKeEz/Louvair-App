import SignInBtn from '@/components/Auth/sign-in-btn'
import BurgerNav from '@/components/BurgerNav'
import { MainNav } from '@/components/main-nav'
import { marketingConfig } from '@/config/marketing'
import { getAuthSession } from '../_clients/nextAuth'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  const session = await getAuthSession()

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='container z-40 bg-background'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav />
          {session?.user && (
            <div className='hidden md:flex'>
              <SignInBtn />
            </div>
          )}
          <nav className='md:hidden flex'>
            <BurgerNav />
          </nav>
          <SignInBtn />
        </div>
      </header>
      <main className=''>{children}</main>
    </div>
  )
}
