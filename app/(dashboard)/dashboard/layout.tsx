import { getCurrentUser } from '@/lib/session'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { MainNav } from '@/components/navigation/main-nav'
import { DashboardNav } from '@/components/navigation/nav'
import { dashboardConfig } from '@/config/dashboard'
import { authOptions } from '@/lib/auth'
import { SiteFooter } from '@/components/site-footer'
import { UserAccountNav } from '@/components/user-account-nav'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { marketingConfig } from '@/config/marketing'
import BurgerNav from '@/components/navigation/BurgerNav'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <div className='container flex h-16 items-center justify-between py-4'>
          <MainNav items={marketingConfig.mainNav} />
          {/* <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email
            }}
          /> */}
          <BurgerNav />
        </div>
      </header>
      <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='hidden w-[200px] flex-col md:flex'>
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className='flex w-full flex-1 flex-col overflow-hidden'>{children}</main>
      </div>
      <SiteFooter className='border-t' />
    </div>
  )
}
