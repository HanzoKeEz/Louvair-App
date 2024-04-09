import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function getProducts() {
  const allProducts = await stripe.products.list()
  console.log('allProducts: ', allProducts.data)

  const activeProducts = allProducts.data.filter((product) => product.metadata.isActive === 'true')
  console.log('activeProducts: ', activeProducts)

  const productsWithPrices = await Promise.all(
    activeProducts.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id })
      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: product.metadata.isActive
      }
    })
  )
  return productsWithPrices
}
