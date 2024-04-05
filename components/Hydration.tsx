'use client'

import { useThemeStore } from '@/zustand/store'
import { ReactNode, useEffect, useState } from 'react'

// ZUSTAND: HYDRATE COMPONENT TO HANDLE CLIENT-SIDE RENDERING (STEP 4) ⭐️
// This component prevents client-specific code from running on the server and
// causing a mismatch between pre-rendered server-rendered and client-rendered
// markup. It does this by rendering its `children` (client-specific code) only
// after the component has "mounted" on the client (i.e. after hydration).

// Because our Zustand implementation is a client-side state management library,
// we use this component to prevent Zustand-related state (like a `isOpen` state
// of the cartStore) from causing hydration errors if they don't sync up.

interface Props {
  children: ReactNode
}

export default function Hydration({ children }: Props) {
  const [isHydrated, setIsHydrated] = useState(false)
  const themeStore = useThemeStore()
  // Wait until Next.js completed hydration before rendering `children`:
  useEffect(() => setIsHydrated(true), [])
  // If hydration is complete, render `children`. If not render loading status.
  // Ensuring a `children` prop (which may depend on client-side state/library)
  // are only rendered "committed" on the client, preventing hydration errors,
  // once the component has "mounted" using our effect hook, on the client.
  return (
    <>
      {!isHydrated ? (
        <body className='flex items-center justify-center w-full h-full'>
          <code className='px-3 py-2 text-lg rounded-md bg-base-200'>Loading...</code>
        </body>
      ) : (
        <body
          data-theme={themeStore.mode}
          className='px-4 lg:px-48 font-karla'
        >
          {children}
        </body>
      )}
    </>
  )
}
