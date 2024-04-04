import { getCurrentUser } from '@/lib/session'
import { MainNav } from '@/components/navigation/main-nav'
import { DashboardNav } from '@/components/navigation/nav'
import { dashboardConfig } from '@/config/dashboard'
import { SiteFooter } from '@/components/site-footer'
import { marketingConfig } from '@/config/marketing'
import BurgerNav from '@/components/navigation/BurgerNav'
import { UserAccountNav } from '@/components/user-account-nav'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className='flex min-h-screen bg-zinc-400 flex-col space-y-6'>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <div className='container flex h-16 items-center justify-between py-4'>
          <MainNav items={marketingConfig.mainNav} />
          {user && (
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email
              }}
            />
          )}
          <BurgerNav />
        </div>
      </header>
      <div className='container grid flex-1 gap-10 md:grid-cols-[200px_1fr]'>
        <aside className='hidden bg-zinc-200 z-[10] w-[200px] flex-col md:flex'>
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className='flex w-full flex-1 flex-col overflow-hidden'>{children}</main>
      </div>
      <SiteFooter className='border-t' />
    </div>
  )
}
