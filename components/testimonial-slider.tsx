'use client'

import { InfiniteMovingCards } from './ui/infinite-moving-cards'

export function InfiniteCardSlider() {
  return (
    <div className='h-[40rem] rounded-md md:flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative hidden'>
      {/* <InfiniteMovingCards
        items={testimonials}
        direction='right'
        speed='slow'
      /> */}
    </div>
  )
}

export const testimonials = [
  {
    quote:
      'The convenience of automatic fragrance refills has transformed my living space. The scents are always fresh and perfectly timed, making my home welcoming for every guest.',
    name: 'Linh Anderson',
    role: 'Entrepreneur',
    imgSrc: 'https://i.pravatar.cc/120?img=25'
  },
  {
    quote:
      'As a small business owner, creating a pleasant atmosphere for my clients is crucial. This service has been a game-changer for my boutique, offering a unique and inviting ambiance.',
    name: 'Michael Trần',
    role: 'Boutique Owner',
    imgSrc: 'https://i.pravatar.cc/120?img=30'
  },
  {
    quote:
      'I love coming home to a space that smells amazing. It’s like walking into a new home every time the fragrance changes.',
    name: 'Emma Nguyễn',
    role: 'Graphic Designer',
    imgSrc: 'https://i.pravatar.cc/120?img=47'
  },
  {
    quote:
      'This subscription service is not just about the fragrance; it’s about the experience. It’s a monthly reminder to take a moment for myself and enjoy the little things.',
    name: 'Tri Phạm',
    role: 'Freelancer',
    imgSrc: 'https://i.pravatar.cc/120?img=31'
  },
  {
    quote:
      'I was always forgetful when it came to buying new air fresheners. Now, with automatic shipments, my home always smells great, and it’s one less thing I have to worry about.',
    name: 'Tammy Lê',
    role: 'Nail Salon Owner',
    imgSrc: '/testimonials/nail-owner.png'
  },
  {
    quote:
      'The quality of oils provided is top-notch, and the variety keeps my senses intrigued. Highly recommend for anyone looking to elevate their home’s atmosphere.',
    name: 'Ethan Vũ',
    role: 'Interior Designer',
    imgSrc: '/testimonials/ethanvu.png'
  },
  {
    quote:
      'From the customer service to the product itself, everything is impeccable. It’s a luxury experience that’s absolutely worth it.',
    name: 'Ava Ngô',
    role: 'Real Estate Agent',
    imgSrc: 'https://i.pravatar.cc/120?img=45'
  }
]
