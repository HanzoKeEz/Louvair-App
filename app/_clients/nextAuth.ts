import { prisma } from '@/app/_clients/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { DefaultSession, getServerSession, type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { stripe } from './stripe'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User & DefaultSession['user']
  }
}

const getCredentials = () => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('Missing Google Credentials')
  }

  return { clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }
}
export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',

  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: getCredentials().clientId,
      clientSecret: getCredentials().clientSecret,
      profile(profile): any {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user',
          isPaid: profile.isPaid ?? false
        }
      }
    })
  ],
  events: {
    createUser: async ({ user }) => {
      if (user.email) {
        const customer = await stripe.customers.create({
          name: user.name ?? '-',
          email: user.email
        })

        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeCustomerId: customer.id
          }
        })
      }
    }
  },
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return baseUrl
    },
    session: async ({ session, token, user, trigger, newSession }) => {
      if (session?.user) {
        session.user = user
        session.user.id = user.id
        session.user.role = user.role
        session.user.isPaid = user.role === 'admin' || user.isPaid
      }

      return session
    }
  }
}

export const getAuthSession = async () => {
  return getServerSession(authOptions)
}
