import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/app/_clients/nextAuth'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}
