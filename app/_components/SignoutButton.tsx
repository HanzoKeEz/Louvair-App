'use client'

import { signOut } from 'next-auth/react'
import { useTransition } from 'react'
import { Button } from './Button'

export function SignOutButton() {
  const [isPending, transition] = useTransition()

  const handleClick = () => {
    transition(async () => {
      try {
        await signOut()
      } catch {
        alert('Failed to sign out')
      }
    })
  }

  return (
    <Button
      className='bg-neutral-900 w-36 text-center justify-center p-2 rounded-lg text-card items-center flex text-sm hover:bg-neutral-900/80 z-[999]'
      onClick={handleClick}
      disabled={isPending}
    >
      Sign out
    </Button>
  )
}
