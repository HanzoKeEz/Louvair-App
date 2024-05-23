import { useTheme } from '@/hooks/use-theme'

import Image from 'next/image'

function Logo() {
  const { theme } = useTheme()
  console.log('theme', theme)
  return (
    <div className='flex items-center flex-col'>
      <Image
        src={theme === 'dark' ? '/Louvair/LogoWhite.png' : '/Louvair/LogoBrand.png'}
        alt='Larry Logo'
        width={40}
        height={40}
      />
      <h3 className='text-[10px] tracking-wider text-center w-full uppercase sm:text-neutral-500 font-syncopate'>
        L&apos;ouvair
      </h3>
    </div>
  )
}

export default Logo
