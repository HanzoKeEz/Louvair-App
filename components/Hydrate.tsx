'use client'

import { SessionProvider } from 'next-auth/react'
import { useThemeStore } from '../store'
import { ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { fontSans } from '@/lib/fonts'

export default function Hydrate({ children }: { children: ReactNode }) {
	const [isHydrated, setIsHydrated] = useState(false)
	const themeStore = useThemeStore()

	// Wait will Nextjs rehydrate completes
	useEffect(() => {
		setIsHydrated(true)
	}, [])

	return (
		<>
			<SessionProvider>
				{isHydrated ? (
					<body
						className='
							min-h-screen bg-background font-robot antialiased w-screen px-3'

						// data-theme={themeStore.mode}
					>
						{children}
					</body>
				) : (
					<body></body>
				)}
			</SessionProvider>
		</>
	)
}
