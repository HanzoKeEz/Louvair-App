import { DefaultUser } from 'next-auth'
import { PrismaClient } from '@prisma/client'

declare global {
  // biome-ignore lint: no-var
  var prisma: PrismaClient
}
declare module 'next-auth' {
  interface User {
    id: string
    role: 'user' | 'admin'
    isPaid: boolean
    stripeCustomerId: string
    isActive: boolean
    subscriptionId: string
  }
  interface Session {
    user: User & DefaultUser
  }
}
