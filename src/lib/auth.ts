import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/util/db'
import Stripe from 'stripe'
import { nanoid } from 'nanoid'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/sign-in',
	},

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		//Add another provider
	],
	events: {
		createUser: async ({ user }) => {
			const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
				apiVersion: '2022-11-15',
			})
			//Let's create a stripe customer

			const costumer = await stripe.customers.create({
				email: user.email || undefined,
				name: user.name || undefined,
			})
			//Also update our prisma user with the stripecustomerid

			await db.user.update({
				where: { id: user.id },
				data: { stripeCustomerId: costumer.id },
			})
		},
	},
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id
				session.user.name = token.name
				session.user.email = token.email
				session.user.image = token.picture
				session.user.username = token.username
			}

			return session
		},

		async jwt({ token, user }) {
			const dbUser = await db.user.findFirst({
				where: {
					email: token.email,
				},
			})

			if (!dbUser) {
				token.id = user!.id
				return token
			}

			if (!dbUser.username) {
				await db.user.update({
					where: {
						id: dbUser.id,
					},
					data: {
						username: nanoid(10),
					},
				})
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
				username: dbUser.username,
			}
		},
		redirect() {
			return '/'
		},
	},
}
export const getAuthSession = () => getServerSession(authOptions)
