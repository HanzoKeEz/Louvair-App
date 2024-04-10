'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function SignInBtn() {
  return (
    <Button
      className='z-[999] relative'
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  )
}
