import SignInBtn from '@/components/Auth/sign-in-btn'
import BurgerNav from '@/components/BurgerNav'
import { MainNav } from '@/components/main-nav'
import { marketingConfig } from '@/config/marketing'
import { getAuthSession } from '../_clients/nextAuth'
import Footer from '@/components/Footer'
import { SignInButton } from '@/app/_components/SignInButton'
import { UserAccountNav } from '@/components/user-account-nav'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  const session = await getAuthSession()

  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <div className='container flex h-20 items-center justify-between py-6'>
          <MainNav />
          <BurgerNav />

          {session?.user ? (
            <UserAccountNav
              user={{
                name: session.user.name,
                image: session.user.image,
                email: session.user.email
              }}
            />
          ) : (
            <SignInButton />
          )}
        </div>
      </header>
      <main className='container'>{children}</main>
      <Footer />
    </div>
  )
}
