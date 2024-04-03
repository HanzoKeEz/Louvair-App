import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15'
})

export async function getProducts() {
  const products = await stripe.products.list()
  // Here we alter the products array to include the prices for each product as
  // well as the product information. The Promise.all() method allows us to run
  // all promises in parallel & wait for them to resolve before returning data.

  products.data.filter((product) => product.metadata.features === 'oil')
  const productsWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id })
      const features = product.metadata.features || '' // extract features
      return {
        // ...product,
        // prices: prices.data,
        // 👇🏻 Alternatively we can structure the return object to only include:
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: { features }
      }
    })
  )
}
