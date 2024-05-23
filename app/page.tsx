'use client'

import { HeroSlider } from '@/components/HeroSlider'
import Products from '@/app/_components/Products'
import { useEffect } from 'react'

export default function Index() {
  useEffect(() => {
    ;(async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      const locomotiveScroll = new LocomotiveScroll()
    })()
  }, [])
  return (
    <main className='w-full min-h-screen '>
      <div className=''>
        <HeroSlider />
      </div>
      <section className=''>
        <Products />
      </section>
    </main>
  )
}
