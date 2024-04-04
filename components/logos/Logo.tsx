import Image from 'next/image'
import LouvairLogo from '../../public/lit2l/LogoWhite.png'

export const Logo = ({ ...props }) => (
  <Image
    src={LouvairLogo}
    alt='Louvair Logo'
    height={100}
    width={100}
    {...props}
    className='h-12 w-12 rounded-full'
  />
)
