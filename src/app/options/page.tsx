'use client'
import DeleteGameDataButton from '@/components/settings/deleteGameDataButton'
import NavbarLayout from '@/layouts/navbar'
import { signIn, useSession, signOut } from 'next-auth/react'

export default function ClickerPage() {
  const { data, status } = useSession()
  const loading = status === 'loading'
  const loggedIn = data && status === 'authenticated'
  const loggedOut = !data && status === 'unauthenticated'
  return (
    <NavbarLayout>
      <div className="flex flex-col items-center justify-center gap-4">
        {loading && <p className="animate-spin text-4xl text-yellow-200">⚙</p>}
        {loggedOut && (
          <button
            className="btn-yellow rounded-md p-2"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}
        {loggedIn && (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-yellow-200">
              Welcome, {data?.user?.name ?? 'user'}
            </p>
            <button
              className="btn-yellow rounded-md p-2"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        )}
        <DeleteGameDataButton />
      </div>
    </NavbarLayout>
  )
}
