'use client'
import DeleteGameDataButton from '@/components/settings/deleteGameDataButton'
import NavbarLayout from '@/layouts/navbar'
import { signIn, useSession, signOut } from 'next-auth/react'

export default function ClickerPage() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const loggedIn = session && status === 'authenticated'
  const loggedOut = !session && status === 'unauthenticated'

  return (
    <NavbarLayout>
      <div className="flex flex-col items-center justify-center gap-2">
        {loading && <p className="animate-spin text-yellow-200">Loading...</p>}
        {loggedOut && (
          <button
            className="btn-yellow rounded-md p-2"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
        {loggedIn && (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-yellow-200">Welcome, {session.user?.name}</p>
            <button className="btn-yellow" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        )}
        <DeleteGameDataButton />
      </div>
    </NavbarLayout>
  )
}
