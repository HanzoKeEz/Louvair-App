/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'files.stripe.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'marketplace.canva.com',
			},
			{
				protocol: 'https',
				hostname: 'globaltv.es',
			},

			{
				protocol: 'https',
				hostname: 'media.product.which.co.uk',
			},
			{
				protocol: 'https',
				hostname: 'pbs.twimg.com',
			},
			{
				protocol: 'https',
				hostname: 'intl.nothing.tech',
			},
			{
				protocol: 'https',
				hostname: 'lemanoosh.com',
			},
		],
	},
}

module.exports = nextConfig
