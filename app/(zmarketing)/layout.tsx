import SignInBtn from '@/components/Auth/sign-in-btn'
import BurgerNav from '@/components/BurgerNav'

import { marketingConfig } from '@/config/marketing'
import { authOptions, getAuthSession } from '../_clients/nextAuth'
import Footer from '@/components/Footer'
import { getServerSession } from 'next-auth'
import { getProducts } from '@/utils/getProducts'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  const user = await getServerSession(authOptions)
  const products = await getProducts()
  console.log('products: ', products)
  return (
    <div className='flex min-h-screen flex-col w-full'>
      <main className='container'>{children}</main>
    </div>
  )
}
