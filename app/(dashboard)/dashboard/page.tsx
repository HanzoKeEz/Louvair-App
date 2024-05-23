import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/shell'
import { getUserSubscriptionPlan } from '@/lib/subscription'
import { authOptions, getAuthSession } from '@/app/_clients/nextAuth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Icons } from '@/components/shared/icons'

import { redirect } from 'next/navigation'
import { getProducts } from '@/utils/getProducts'
import Product from '@/app/_components/Product'

export const metadata = {
  title: 'Dashboard'
}

export default async function DashboardPage() {
  const user = await getAuthSession()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const products = await getProducts()

  console.log('products: ', products)

  return (
    <DashboardShell>
      <DashboardHeader
        heading='Home Dashboard'
        text='Browse, Shop or Manage billing and your subscription plan.'
      />
      <div className='grid gap-8'>
        <Alert className='!pl-14'>
          <Icons.warning />
          <AlertTitle>Louvair App is in test mode.</AlertTitle>
          <AlertDescription>
            Taxonomy app is a demo app using a Stripe test environment. You can find a list of test
            card numbers on the{' '}
            <a
              href='https://stripe.com/docs/testing#cards'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-8'
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>
      </div>
      <section className='grid grid-cols-2 my-12 gap-12'>
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            unit_amount={product.unit_amount}
            description={product.description as string}
            metadata={product.metadata}
          />
        ))}
      </section>
    </DashboardShell>
  )
}
