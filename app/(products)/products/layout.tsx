'use client'
import { MainNav } from '@/components/navigation/main-nav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.isActive) {
      return router.push('/dashboard')
    }
    if (status === 'unauthenticated') {
      return
    }
  }, [status, session, router])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <section className='flex min-h-screen h-full items-center'>
      <nav>
        <MainNav />
      </nav>

      {children}
    </section>
  )
}
