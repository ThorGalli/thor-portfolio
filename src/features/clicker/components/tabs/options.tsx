'use client'
import DeleteGameDataButton from '@/components/settings/deleteGameDataButton'
import SaveGameButton from '@/components/settings/saveGameButton'
import { signIn, useSession, signOut } from 'next-auth/react'

export default function Options() {
  const { data, status } = useSession()
  const loading = status === 'loading'
  const loggedIn = data && status === 'authenticated'
  const loggedOut = !data && status === 'unauthenticated'
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <SaveGameButton />
      {loading && <p className="animate-spin text-4xl text-yellow-200">⚙</p>}

      {loggedOut && (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-yellow-200">
            Sign in with <span className="text-green-400">Google</span>
          </p>
          <button
            className="btn-yellow rounded-md p-2"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
      {loggedIn && (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-yellow-200">
            You are logged in as{' '}
            <span className="text-green-400">{data?.user?.name ?? 'user'}</span>
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
  )
}
