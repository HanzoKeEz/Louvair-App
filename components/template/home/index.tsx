import Hero from '@/components/template/hero'

import TestimonialSliderComponent from '@/components/testimonials/testimonial-slider-component'
import Reel from '../reel'
import Play from '@/components/template/play'
import { SiteFooter } from '@/components/site-footer'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <div className='max-w-screen w-full'>
      <Hero />
      <Play />
      <Reel />
      {/* <div className='max-w-screen px-6 overflow-hidden h-96 grid grid-cols-1 items-center min-w-min justify-center '>
        <TestimonialSliderComponent />
      </div> */}
      <Separator />
      <SiteFooter />
    </div>
  )
}
