'use client'
import { motion } from 'framer-motion'
import React from 'react'
import { ImagesSlider } from './ui/images-slider'
import Link from 'next/link'

export function HeroSlider() {
  const images = ['/asset 1.png', '/louvair9.png', '/hero.png', '/hero2.png']
  return (
    <div className='w-full h-full p-2'>
      <ImagesSlider
        className='h-[40rem]'
        images={images}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -80
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          className='z-50 flex flex-col justify-evenly items-center'
        >
          <motion.p className='font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent font-syncopate bg-gradient-to-b from-neutral-50 to-neutral-400 py-32'>
            L&apos;ouvair
          </motion.p>
          <Link
            href='/login'
            className='px-6 py-2 backdrop-blur-md border bg-amber-800/10 border-gray-300/20 text-white mx-auto text-center rounded-full relative mt-24'
          >
            <span>Join now →</span>
            <div className='absolute inset-x-0  h-px -bottom-1px bg-gradient-to-r w-3/4 mx-auto from-transparent via-yellow-500 to-transparent' />
          </Link>
        </motion.div>
      </ImagesSlider>
    </div>
  )
}
