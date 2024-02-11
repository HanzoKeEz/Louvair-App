import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { prisma } from '@/utils/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2022-11-15',
})
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const user = await getServerSession(req, res, authOptions)

			if (!user) res.status(403).json({ message: 'Not logged in' })

			const orders = await prisma.order.findMany({
				where: { userId: (user?.user as any).id },
				include: { products: true },
			})
			res.status(200).json(orders)
		} catch (error) {
			res.status(500).json({ message: error })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).json({ message: `Method ${req.method} Not Allowed` })
	}
}
