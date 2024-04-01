import React from 'react'

interface GlassCardProps {
  title: string
  expiration: string
  cvv: string
}

const GlassCard: React.FC<GlassCardProps> = ({ title, expiration, cvv }) => {
  return (
    <div className='glass-card font-assistant tracking-wider bg-card'>
      <h2 className='text-amber-400 text-lg tracking-wide'>{title}</h2>
      <span className='flex justify-between items-center text-card-foreground my-3'>
        <p>{expiration}</p>
        <p>{cvv}</p>
      </span>
      <p className='text-sm'>Zip: 42424</p>
    </div>
  )
}

export default GlassCard
