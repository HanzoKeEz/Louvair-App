import { prisma } from '@/app/_clients/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getServerSession, type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { stripe } from './stripe'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
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
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.picture
      }
      return session
    }
  }
}

export const getAuthSession = async () => {
  return getServerSession(authOptions)
}
