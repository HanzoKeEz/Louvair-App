'use client'

import { signIn } from 'next-auth/react'
import { useTransition } from 'react'
import { Button } from './Button'
import { FcGoogle } from 'react-icons/fc'

export function SignInButton() {
  const [isPending, transition] = useTransition()

  const handleClick = () => {
    transition(async () => {
      try {
        await signIn()
      } catch {
        alert('Failed to sign in')
      }
    })
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className='bg-neutral-900 w-36 text-center justify-center p-2 rounded-lg text-card items-center flex text-sm hover:bg-neutral-900/80 z-[999]'
    >
      Sign in with
      <FcGoogle className='ml-2' />
    </Button>
  )
}
