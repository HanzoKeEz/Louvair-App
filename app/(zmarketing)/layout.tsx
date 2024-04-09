import SignInBtn from '@/components/Auth/sign-in-btn'
import BurgerNav from '@/components/Navigation/BurgerNav'
import { MainNav } from '@/components/Navigation/main-nav'
import { marketingConfig } from '@/config/marketing'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='container z-40 bg-background'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav />
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
