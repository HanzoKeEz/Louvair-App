import { Metadata } from 'next'
import Link from 'next/link'
import { UserAuthForm } from '@/components/user-auth-form'
import { ChevronLeft } from 'lucide-react'
import { LogoBrand } from '@/app/_components/logos/LogoBrand'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

export default function LoginPage() {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 '>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'absolute left-20 top-20 md:left-8 md:top-32'
        )}
      >
        <>
          <Icons.chevronLeft className=' font-assistant text-black  z-10 mr-2 h-4 w-4' />
          Back
        </>
      </Link>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <div className='w-full flex items-center justify-center'>
            <LogoBrand className='mx-auto h-6 w-6 ' />
          </div>
          <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className='px-8 text-center text-sm text-muted-foreground'>
          <Link
            href='/register'
            className='hover:text-brand underline underline-offset-4 text-slate-800'
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
