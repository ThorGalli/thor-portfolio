'use client'
import React from 'react'
import { useClickerContext } from '@/contexts/useClickerContext'
import ConfirmationDialog from './confirmationDialog'
import { useUrlDisclosure } from '@/hooks/useUrlDisclosure'

export default function DeleteGameDataButton() {
  const { deleteGameData, loading } = useClickerContext()
  const { isOpen, onOpen, onClose } = useUrlDisclosure('confirmDelete')

  const handleDelete = () => {
    deleteGameData()
    onClose()
  }

  return (
    <>
      <button
        className="relative h-fit cursor-pointer overflow-hidden rounded-md border-2 border-orange-900 bg-orange-700 px-2 text-black hover:bg-orange-600 hover:text-black"
        onClick={onOpen} // Update the query parameter
      >
        <p className="relative z-20">
          {loading && 'Loading...'}
          {!loading && 'Delete Game Data'}
        </p>
      </button>

      {/* Use the ConfirmationDialog component here */}
      <ConfirmationDialog
        isOpen={isOpen}
        onConfirm={handleDelete}
        confirmQuestion="Are you sure you want to delete all your game data?"
        confirmAnswer="Delete"
        onCancel={onClose} // Update the query parameter
      />
    </>
  )
}
