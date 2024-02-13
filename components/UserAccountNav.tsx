'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'

import { User } from 'next-auth'
import { UserAvatar } from './UserAvatar'
import { signOut } from 'next-auth/react'
import { CreditCard, Heart, ListOrdered, MapPin, ShoppingBag, UserX } from 'lucide-react'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<User, 'name' | 'image' | 'email'>
}

export function UserAccountNav({ user }: UserAccountNavProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar user={{ name: user.name || null, image: user.image || null }} className='h-9 w-9' />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-zinc-300' align='end'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{user.name && <p className='font-medium'>{user.name}</p>}
						{user.email && <p className='w-[200px] truncate text-sm text-muted-foreground'>{user.email}</p>}
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/'>Feed</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild>
					<Link href='/r/create'>Create Community</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild>
					<Link href='/settings'>Settings</Link>
				</DropdownMenuItem>
				<Link href='/profile/addresses'>
					<DropdownMenuItem className='flex gap-2'>
						<MapPin className='h-4' />
						Edit Addresses
					</DropdownMenuItem>
				</Link>
				<Link href='/profile/edit'>
					<DropdownMenuItem className='flex gap-2'>
						<UserX className='h-4' />
						Edit Profile
					</DropdownMenuItem>
				</Link>
				<Link href='/profile/orders'>
					<DropdownMenuItem className='flex gap-2'>
						<ListOrdered className='h-4' />
						Orders
					</DropdownMenuItem>
				</Link>
				<Link href='/profile/payments'>
					<DropdownMenuItem className='flex gap-2'>
						<CreditCard className='h-4' />
						Payments
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<Link href='/cart'>
					<DropdownMenuItem className='flex gap-2'>
						<ShoppingBag className='h-4' /> Cart
					</DropdownMenuItem>
				</Link>
				<Link href='/wishlist'>
					<DropdownMenuItem className='flex gap-2'>
						<Heart className='h-4' /> Wishlist
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='cursor-pointer' onSelect={() => signOut()}>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserAccountNav
