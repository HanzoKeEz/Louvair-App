import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma as any),
	secret: process.env.NEXTAUTH_SECRET,
	// pages: {
	//   signIn: '/login',
	//   signOut: '/logout',
	//   error: '/login',
	//   verifyRequest: '/login',
	//   newAccount: '/signup',
	// },
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		// Add another provider
	],

	events: {
		createUser: async ({ user }) => {
			const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
				apiVersion: '2022-11-15',
			})
			// Let's create a stripe customer
			if (user.name && user.email) {
				const customer = await stripe.customers.create({
					email: user.email,
					name: user.name,
				})
				// Update the prisma user with the stripe customer id
				await prisma.user.update({
					where: { id: user.id },
					data: { stripeCustomerId: customer.id },
				})
			}
		},
	},
	callbacks: {
		async session(session, token, user) {
			session.user.id = user.id
			return session
		},
	},
}

export default NextAuth(authOptions)
