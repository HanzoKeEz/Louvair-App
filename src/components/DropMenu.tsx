'use client'

import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from 'lucide-react'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSession } from 'next-auth/react'
import { Label } from './ui/label'

export default function DropMenu() {
	const { data: session, status } = useSession()
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className=''>
						<Button variant='ghost'>
							<Avatar>
								<AvatarImage
									src={session?.user?.image as string}
									alt={session?.user.name as string}
									width={20}
									height={20}
									className='rounded-full'
								/>

								<AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
							</Avatar>
						</Button>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className=''>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<User className='mr-2 h-4 w-4' />
							<span>Profile</span>
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CreditCard className='mr-2 h-4 w-4' />
							<span>Billing</span>
							<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className='mr-2 h-4 w-4' />
							<span>Settings</span>
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Keyboard className='mr-2 h-4 w-4' />
							<span>Keyboard shortcuts</span>
							<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Users className='mr-2 h-4 w-4' />
							<span>Team</span>
						</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem>
										<Mail className='mr-2 h-4 w-4' />
										<span>Email</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<MessageSquare className='mr-2 h-4 w-4' />
										<span>Message</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<PlusCircle className='mr-2 h-4 w-4' />
										<span>More...</span>
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Github className='mr-2 h-4 w-4' />
						<span>GitHub</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<LifeBuoy className='mr-2 h-4 w-4' />
						<span>Support</span>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						<Cloud className='mr-2 h-4 w-4' />
						<span>API</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<LogOut className='mr-2 h-4 w-4' />
						<span>Log out</span>
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
