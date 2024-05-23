import { MainNav } from '@/app/_components/navigation/main-nav'
import { DashboardNav } from '@/components/nav'
import { dashboardConfig } from '@/config/dashboard'

import { UserAccountNav } from '@/components/user-account-nav'
import { getAuthSession } from '@/app/_clients/nextAuth'
import { SignInButton } from '@/app/_components/SignInButton'
import { MobileNav } from '@/app/_components/navigation/mobile-navigation'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getAuthSession()
  const user = session?.user

  return (
    <div className='flex min-h-screen bg-background flex-col border-4 border-black '>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <MainNav />
        <MobileNav />
        <div className='z-40 border-4'>
          {user ? (
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email
              }}
            />
          ) : (
            <SignInButton />
          )}
        </div>
      </header>
      <div className='container grid flex-1 gap-6 md:grid-cols-[200px_1fr]'>
        <aside className='hidden bg-gray-950/95  z-[10] w-[200px] flex-col md:flex'>
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className=' '>{children}</main>
      </div>
    </div>
  )
}
