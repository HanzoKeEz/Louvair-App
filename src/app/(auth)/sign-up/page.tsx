'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import Logo from '../../../../public/Logo.png'
import Link from 'next/link'
import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import {
	AuthCredentialsValidator,
	TAuthCredentialsValidator,
} from '@/lib/validations/account-credentials-validator'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'
import { ZodError } from 'zod'

function Page() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	})

	const router = useRouter()

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		// send data to the server
	}

	return (
		<>
			<div className='container relative flex flex-col pt-20 items-center justify-center lg:px-0 border-4'>
				<div className='flex flex-col mx-auto justify-center space-y-6 sm:w-[360px]'>
					<div className='flex flex-col items-center space-y-2 text-center'>
						<Image src={Logo} alt={'Logo'} height={36} width={36} />
						<h1 className='text-muted-foreground text-2xl font-semibold tracking-tight'>
							Create an account
						</h1>

						<Link
							className={buttonVariants({
								variant: 'link',
								className: 'gap-1.5',
							})}
							href='/sign-in'
						>
							Already have an account? Sign-in
							<ArrowRight className='h-4 w-4' />
						</Link>
					</div>
				</div>

				<div className='grid gap-6'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid gap-2'>
							<div className='grid gap-1 py-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									{...register('email')}
									className={cn({ 'focus-visible:ring-red-500': errors.email })}
									placeholder='you@example.com'
								/>
								{errors?.email && (
									<p className='text-sm text-red-500'>{errors.email.message}</p>
								)}
							</div>

							<div className='grid gap-1 py-2'>
								<Label htmlFor='password'>Password</Label>
								<Input
									{...register('password')}
									className={cn({
										'focus-visible:ring-red-500': errors.password,
									})}
									placeholder='Password'
								/>
								{errors?.password && (
									<p className='text-sm text-red-500'>
										{errors.password.message}
									</p>
								)}
							</div>
						</div>
						<Button>Sign up</Button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Page
