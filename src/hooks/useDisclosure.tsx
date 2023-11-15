'use client'
import { useState } from 'react'

export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false)

  function onOpen() {
    setIsOpen(true)
  }

  function onClose() {
    setIsOpen(false)
  }

  return { isOpen, onOpen, onClose }
}
