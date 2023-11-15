'use client'
import React from 'react'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import ConfirmationDialog from './confirmationDialog'
import { useDisclosure } from '@/hooks/useDisclosure'

export default function DeleteGameDataButton() {
  const { deleteGameData, loading } = useClickerContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = () => {
    deleteGameData()
    onClose()
  }

  return (
    <>
      <button
        className="relative h-fit cursor-pointer overflow-hidden rounded-md  border-orange-900 bg-orange-700 p-2 text-black hover:bg-orange-600 hover:text-black"
        onClick={onOpen} // Update the query parameter
      >
        <p className="relative z-20">
          {loading && 'Loading...'}
          {!loading && 'Delete Cookies'}
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
