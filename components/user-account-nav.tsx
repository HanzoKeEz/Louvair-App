'use client'

import Link from 'next/link'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/user-avatar'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'>
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <div className='z-[999]'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            user={{ name: user.name || null, image: user.image || null }}
            className='h-10 w-10 border'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <div className='flex font-assistant items-center justify-start gap-2 p-2'>
            <div className='flex flex-col space-y-1 leading-none'>
              {user.name && <p className='font-medium'>{user.name}</p>}
              {user.email && (
                <p className='w-[200px] truncate text-sm text-muted-foreground'>{user.email}</p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href='/dashboard'>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/dashboard/billing'>Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/dashboard/settings'>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => {
              signOut()
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
