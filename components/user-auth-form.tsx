'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { FcGoogle } from 'react-icons/fc'
import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Disc3 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema)
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn('email', {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/dashboard'
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive'
      })
    }

    return toast({
      title: 'Check your email',
      description: 'We sent you a login link. Be sure to check your spam too.'
    })
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    const callbackUrl = searchParams?.get('from') || '/dashboard'
    const signInResult = await signIn('google', { redirect: false, callbackUrl })

    setIsGoogleLoading(false)

    if (signInResult?.ok) {
      router.push(signInResult.url as string)
      toast({
        title: 'Success',
        description: 'You are now signed in with Google.',
        variant: 'default'
      })
    } else {
      toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div
      className={cn('grid gap-6 font-space', className)}
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)}></form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-primary-foreground'>Continue with</span>
        </div>
      </div>
      <button
        type='button'
        className='border-black bg-neutral-900 hover:bg-opacity-80 flex items-center justify-center gap-3  h-9 w-82 rounded-md text-neutral-100 duration-200'
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Disc3 className='mr-2 h-5 w-5 animate-spin' />
        ) : (
          <FcGoogle className='mr-2 h-5 w-5' />
        )}{' '}
        Google
      </button>
    </div>
  )
}
