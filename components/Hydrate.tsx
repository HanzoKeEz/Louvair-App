'use client'

import { SessionProvider } from 'next-auth/react'

import { ReactNode, useEffect, useState } from 'react'

export default function Hydrate({ children }: { children: ReactNode }) {
	const [isHydrated, setIsHydrated] = useState(false)

	// Wait will Nextjs rehydrate completes
	useEffect(() => {
		setIsHydrated(true)
	}, [])

	return (
		<>
			<SessionProvider>
				{!isHydrated ? (
					<body className=''>
						<span>Loading...</span>
					</body>
				) : (
					<body>{children}</body>
				)}
			</SessionProvider>
		</>
	)
}
