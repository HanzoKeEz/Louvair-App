'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useThemeStore } from '../../store'
import { SessionProvider } from 'next-auth/react'

export default function Hydrate({ children }: { children: ReactNode }) {
	const [isHydrated, setIsHydrated] = useState(false)
	const themeStore = useThemeStore()

	// Waits til Nextjs rehydration completes
	useEffect(() => {
		setIsHydrated(true)
	}, [])

	return (
		<SessionProvider>
			{isHydrated ? (
				<body
					className='px-4 lg:px-48 font-roboto'
					data-theme={themeStore.mode}
				>
					{children}
				</body>
			) : (
				<body></body>
			)}
		</SessionProvider>
	)
}
