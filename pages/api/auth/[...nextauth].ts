// This library allows you to easily add authentication to your Next.js app.
// https://next-auth.js.org/configuration/nextjs#getServerSession
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
// This is a prebuilt provider for Google OAuth authentication, making it easy
// to integrate Google Sign-In into your app.
import GoogleProvider from 'next-auth/providers/google'

// NEXTAUTH: PRISMA ADAPTER FOR AUTHENTICATION (STEP 1) ⭐️
// https://authjs.dev/reference/adapter/prisma
// Setup the adapter from our pages/api/auth/[...nextauth].js route file.
// This adapter allows NextAuth to interact with your database using the Prisma
// ORM (Object-Relational Mapping) library. It works with your `@prisma/client`,
// an auto-generated & type-safe query builder tailored to your db schema.
import { PrismaAdapter } from '@next-auth/prisma-adapter'
// This is the main entry point to your database, allowing you to make queries
// and perform operations on your data via a helpful client API library.

// PRISMA: BEST PRACTICE FOR INSTANTIATING PRISMA CLIENT WITH NEXT.JS ⭐️
// import { PrismaClient } from '@prisma/client';
import { db } from '@/lib/db'

// STRIPE: USING EVENT HANDLERS WITH STRIPE API (STEP 1) ⭐️
import Stripe from 'stripe'

// NEXTAUTH: PROVIDERS (STEP 2) ⭐️
// This is the main export from this file. A `NextAuth` function that configures
// your application's authentication. The function takes a object as an argument
// which configures how NextAuth behaves and what features it enables.
export const authOptions: NextAuthOptions = {
  // Here we are passing the `PrismaClient` instance to the PrismaAdapter.
  // This tells NextAuth to use Prisma as its database ORM.
  adapter: PrismaAdapter(db),
  // https://next-auth.js.org/configuration/options#nextauth_secret
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],

  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15'
      })

      if (user.email && user.name) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name
        })

        await db.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id }
        })
      }
    }
    /* LIST OF OTHER NEXTAUTH EVENT HANDLERS:
    In the `createUser` event handler, you're receiving the newly created user
    object and executing logic which involves interacting with Stripe & updating
    your Prisma database. Here's a list of other events you can subscribe to:

    `signIn`: Fired when a user signs in.
    `signOut`: Fired when a user signs out.
    `createUser`: Fired when a new user is created.
    `updateUser`: Fired when a user is updated.
    `createSession`: Fired when a session is created.
    `updateSession`: Fired when a session is updated.
    `deleteSession`: Fired when a session is deleted.
    `error`: Fired when an error occurs.

    Each event handler receives different arguments related to the event. For
    example, the createUser event handler receives an object containing the newly
    created user, while the signIn event handler receives the user, account, and
    profile related to the sign-in event. */
  },
  // STRIPE: UPDATE SESSION CALLBACK ⭐️
  // A `callbacks` property in NextAuth is a object that allows you to hook into
  // various events in the NextAuth.js lifecycle. These `callbacks` are invoked
  // when certain events occur. Here we are subscribing to a `session` callback.
  // This callback invoked whenever NextAuth.js needs current session data. For
  // instance, during sign in or when `getSession` & `useSession` are called in
  // your Next application, example Checkout component calls our create payment
  // intent api route the returns this session info. By providing this callback,
  // we modify the session object that's usually returned by NextAuth. Here, we
  // adding info with req and res data from our Checkout using that route.
  callbacks: {
    // Needed info is passed in from `pages/api/create-payment-intent.ts` route.
    async session({ session, token, user }) {
      session.user = user
      return session
    }
  }
}

export default NextAuth(authOptions)
