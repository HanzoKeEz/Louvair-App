import Image from 'next/image'
import LouvairLogo from '../../public/lit2l/Logo.png'

export const LogoBrand = ({ ...props }) => (
  <Image
    src={LouvairLogo}
    alt='Louvair Logo'
    height={100}
    width={100}
    {...props}
    className='h-12 w-12 rounded-full'
  />
)
