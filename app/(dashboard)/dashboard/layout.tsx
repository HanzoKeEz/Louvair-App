import { MainNav } from '@/components/Navigation/main-nav'
import { DashboardNav } from '@/components/Navigation/nav'
import { dashboardConfig } from '@/config/dashboard'
import BurgerNav from '@/components/Navigation/BurgerNav'
import { UserAccountNav } from '@/components/user-account-nav'
import { getAuthSession } from '@/app/_clients/nextAuth'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getAuthSession()
  const user = session?.user

  return (
    <div className='flex min-h-screen bg-zinc-400 flex-col space-y-6'>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <div className='container flex h-16 items-center justify-between py-4'>
          <MainNav />
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
    </div>
  )
}
