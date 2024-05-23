import Product from '@/app/_components/Product'

import Stripe from 'stripe'

type Product = {
  id: string
  name: string
  image: string
  unit_amount: number
  description: string
}

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16'
  })
  const products = await stripe.products.list()
  // Here we alter the products array to include the prices for each product as
  // well as the product information. The Promise.all() method allows us to run
  // all promises in parallel & wait for them to resolve before returning data.
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
  return productsWithPrices
}

export default async function Products() {
  const products = await getProducts()
  return (
    <section className=''>
      <div className='grid gap-8 pb-4 grid-cols-fluid'>
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            unit_amount={product.unit_amount}
            description={product.description || ''}
          />
        ))}
      </div>
    </section>
  )
}
