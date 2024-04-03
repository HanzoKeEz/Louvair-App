import React from 'react'
import CardFront from '../public/TESTCARD.png'
import CardBack from '../public/testcard_back.png'
import Image from 'next/image'

function TestCards() {
  return (
    <div className='w-full flex flex-col md:flex-row justify-center items-center'>
      <div className=''>
        <Image
          src={CardFront}
          alt='Front of test card'
          height={800}
          width={800}
        />
      </div>
      <div className=''>
        <Image
          src={CardBack}
          alt='Front of test card'
          height={800}
          width={800}
        />
      </div>
    </div>
  )
}

export default TestCards
