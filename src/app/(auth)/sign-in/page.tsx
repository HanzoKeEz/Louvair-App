import Logo from '../../../../public/Logo.png'
import UserAuthForm from '@/components/UserAuthForm'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const SignIn: FC = () => {
	return (
		<div className='absolute inset-0'>
			<div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
				<Link
					href='/'
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						'self-start -mt-20'
					)}
				>
					<ChevronLeft className='mr-2 h-4 w-4' />
					Home
				</Link>

				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
					<div className='flex flex-col space-y-2 text-center'>
						<Image
							src={Logo}
							alt='logo'
							height={24}
							width={24}
							className='mx-auto h-6 w-6'
						/>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Welcome back
						</h1>
						<p className='text-sm text-muted-foreground'>
							Enter your email to sign in to your account
						</p>
					</div>
					<UserAuthForm />
					<p className='px-8 text-center text-sm text-muted-foreground'>
						<Link
							href='/sign-up'
							className='hover:text-brand underline underline-offset-4'
						>
							Don&apos;t have an account? Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default SignIn
