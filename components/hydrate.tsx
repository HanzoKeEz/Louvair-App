// 'use client'

// import { SessionProvider } from 'next-auth/react'
// import { ReactNode, useEffect, useState } from 'react'

// interface HydrateProps {
//   children: ReactNode
// }

// export default function Hydrate({ children }: HydrateProps) {
//   const [isHydrated, setIsHydrated] = useState(false)

//   useEffect(() => {
//     setIsHydrated(true)
//   }, [])

//   return (
//     <SessionProvider>
//       {!isHydrated ? <body className=''></body> : <body className=''>{children}</body>}
//     </SessionProvider>
//   )
// }
