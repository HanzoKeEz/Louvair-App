import Product from '@/components/Product'
import { HeroSlider } from '@/components/hero-slider'
import { getProducts } from '@/utils/getProducts'

export default async function ProductsPage() {
  const products = await getProducts()
  console.log('products: ', products)

  return (
    <main className='w-full min-h-screen '>
      <div className=''>
        <HeroSlider />
      </div>
      <section className='grid grid-cols-fluid my-12 gap-12'>
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            unit_amount={product.unit_amount}
            description={product.description as string}
            metadata={product.metadata}
          />
        ))}
      </section>
    </main>
  )
}
