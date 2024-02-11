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
					<body className='flex items-center justify-center w-full h-full'>
						<p>loading...</p>
					</body>
				) : (
					<body className='px-4'>{children}</body>
				)}
			</SessionProvider>
		</>
	)
}
