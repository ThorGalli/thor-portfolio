'use client'
import DeleteGameDataButton from '@/components/settings/deleteGameDataButton'
import SaveGameButton from '@/components/settings/saveGameButton'
import { useSession, signOut } from 'next-auth/react'

export default function Options() {
  const { data, status } = useSession()
  const loggedIn = data && status === 'authenticated'
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <header className="header-slate w-full">Options</header>
      <SaveGameButton />

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
