import { motion } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'
import spray from '../public/spray.gif'
import Image from 'next/image'

export default function OrderAnimation() {
  return (
    <div className='flex flex-col items-center justify-center p-12 mt-24'>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Prepping your order
      </motion.h1>
      <Image
        alt='spray'
        src={spray}
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  )
}
