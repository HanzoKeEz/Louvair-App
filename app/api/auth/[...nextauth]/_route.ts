import { authOptions } from '@/pages/api/auth/[...nextauth]'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
