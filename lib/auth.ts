import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '@/lib/db'
import Stripe from 'stripe'

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15'
      })
      // Let's create a stripe customer
      if (user.name && user.email) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name
        })
        // Update the prisma user with the stripe customer id
        await db.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id }
        })
      }
    }
  },
  //   callbacks: {
  //     async session({ token, session }) {
  //       if (token) {
  //         session!.user!.id = token.id
  //         session!.user!.name = token.name
  //         session!.user!.email = token.email
  //         session!.user!.image = token.picture
  //       }
  //       return session
  //     },

  //     async jwt({ token, user }) {
  //       const dbUser = await db.user.findFirst({
  //         where: {
  //           email: token.email
  //         }
  //       })

  //       if (!dbUser) {
  //         if (user) {
  //           token.id = user?.id
  //         }
  //         return token
  //       }

  //       return {
  //         id: dbUser.id,
  //         name: dbUser.name,
  //         email: dbUser.email,
  //         picture: dbUser.image
  //       }
  //     }
  //   }
  // }

  // export default NextAuth(authOptions)
  callbacks: {
    // Needed info is passed in from `pages/api/create-payment-intent.ts` route.
    async session({ session, token, user }) {
      session.user = user
      return session
    }
  }
}

export default NextAuth(authOptions)
