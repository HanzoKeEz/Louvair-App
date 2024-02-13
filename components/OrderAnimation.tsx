'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Gif from '@/public/spray.gif'

export default function OrderAnimation() {
	return (
		<div className='flex items-center justify-center flex-col mt-24 p-12 '>
			<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
				One sec please... ✨
			</motion.h1>
			<Image src={Gif} alt='gif' fill />
		</div>
	)
}
