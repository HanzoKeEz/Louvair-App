import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

// export function cn(...inputs: ClassValue[]) {
// 	return twMerge(clsx(inputs))
// }

export function cn(...args: ClassValue[]) {
	return twMerge(clsx(...args))
}

export function formatPrice(
	price: number | string,
	options: {
		currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
		notation?: Intl.NumberFormatOptions['notation']
	} = {}
) {
	const { currency = 'USD', notation = 'compact' } = options

	const numericPrice = typeof price === 'string' ? parseFloat(price) : price

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		notation,
		maximumFractionDigits: 2,
	}).format(numericPrice)
}

export function constructMetadata({
	title = 'Louvair - an e-commerce website for store for aromatherapy products',
	description = "L'ouvair is an e-commerce website for store for aromatherapy products",
	image = '/thumbnail.png',
	icons = '/favicon.ico',
	noIndex = false,
}: {
	title?: string
	description?: string
	image?: string
	icons?: string
	noIndex?: boolean
} = {}): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image],
			creator: '@larrylobsters',
		},
		icons,
		metadataBase: new URL('https://louvair-app.vercel.app/'),
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	}
}
