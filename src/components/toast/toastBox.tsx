'use client'
import { Toast } from '@/contexts/useToast'
import { useEffect, useMemo, useState } from 'react'

export default function ToastBox({ toast }: { toast: Omit<Toast, 'id'> }) {
  const { message, variant, duration, onClose } = toast
  const [isActive, setIsActive] = useState(true)
  const [isEntering, setIsEntering] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  const variantClass = useMemo(() => {
    switch (variant) {
      case 'success':
        return ' bg-yellow-700 border-yellow-900 text-yellow-200 '
      case 'info':
        return ' bg-stone-600 border-stone-500 text-white '
      case 'warning':
        return ' bg-yellow-400  border-yellow-500 text-white '
      case 'error':
        return ' bg-red-400 text-white '
    }
  }, [variant])

  useEffect(() => {
    // Add a delay to mark the animation as entering.
    setTimeout(() => {
      setIsEntering(false)
    }, 100)

    // Set a timeout to remove the toast with a fade-out animation.
    setTimeout(() => {
      closeToast()
    }, duration)
  }, [])

  useEffect(() => {
    if (isExiting) {
      setTimeout(() => {
        onClose()
      }, 500)
    }
  }, [isExiting])

  function closeToast() {
    setIsActive(false)
    setIsExiting(true)
  }

  const animationClasses = useMemo(() => {
    let classes = ' toast-box '

    if (isEntering) classes += ' entering '
    else if (isActive) classes += ' active '
    else if (isExiting) classes += ' exiting '

    return classes
  }, [isActive, isEntering, isExiting])

  return (
    <div
      className={
        variantClass +
        animationClasses +
        'flex w-64 justify-between rounded-lg border-8 lg:w-96 lg:pl-2'
      }
      onContextMenu={(e) => {
        e.preventDefault()
        closeToast()
      }}
    >
      <div className="my-auto p-1 lg:text-lg">{message}</div>
      <div
        className="h-8 min-w-[2rem] cursor-pointer text-center text-orange-950"
        onClick={closeToast}
      >
        <p className="leading-0 mt-[-1px] text-2xl font-bold">x</p>
      </div>
    </div>
  )
}
