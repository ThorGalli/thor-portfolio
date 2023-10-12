'use client'

import { useState } from 'react'
import { useGameContext } from '@/contexts/useGameContext'

export default function DeleteGameDataButton() {
  const { loading, deleteGameCookie } = useGameContext()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleDelete = () => {
    deleteGameCookie()
    setShowConfirmation(false)
  }

  return (
    <>
      <button
        className="relative h-fit cursor-pointer overflow-hidden rounded-md border-2 border-orange-900 bg-orange-700 px-2 text-black hover:bg-orange-600 hover:text-black"
        onClick={() => setShowConfirmation(true)}
      >
        <p className="relative z-20">
          {loading && 'Loading...'}
          {!loading && 'Delete Game Data'}
        </p>
      </button>
      {showConfirmation && (
        <div className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-md bg-orange-950 p-4">
            <p className="mb-4">Are you sure you want to delete game data?</p>
            <div className="flex justify-end">
              <button
                className="mr-2 rounded-md bg-yellow-700 px-4 py-2 text-white"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-red-500 px-4 py-2 text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
