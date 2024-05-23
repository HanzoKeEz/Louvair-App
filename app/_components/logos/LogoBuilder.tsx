import Image from 'next/image'
import Builder from '../../public/lit2l/LarryLogo.png'

export const LogoBuilder = ({ ...props }) => (
  <Image
    src={Builder}
    alt='Louvair Logo'
    height={100}
    width={100}
    {...props}
    className='h-12 w-12 rounded-full'
  />
)
