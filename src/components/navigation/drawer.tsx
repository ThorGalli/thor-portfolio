import React from 'react'

export default function Drawer({
  children,
  isOpen,
  setIsOpen,
  title,
  side = 'right', // New prop for specifying the side ("left" or "right")
}: {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  side: 'left' | 'right' // Specify the prop type for "side"
}) {
  const isLeftSide = side === 'left'
  const translateX = isLeftSide ? '-translate-x-full' : 'translate-x-full'
  return (
    <div
      className={`fixed inset-0 z-10 mt-16 transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out ${
        isOpen
          ? 'translate-x-0 opacity-100 transition-opacity duration-300'
          : `${translateX} opacity-0 transition-all delay-300`
      }`}
    >
      <div
        className={`absolute ${
          isLeftSide ? 'left-0' : 'right-0'
        } h-full max-w-lg transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : `${translateX}`
        }`}
      >
        <div className="relative flex h-full max-w-lg flex-col gap-2 overflow-y-scroll bg-slate-900">
          <button
            onClick={() => {
              setIsOpen(false)
            }}
            className="absolute right-4 top-3 text-5xl font-bold text-orange-700"
          >
            X
          </button>
          {children}
        </div>
      </div>
      <div
        className="h-full w-screen cursor-pointer"
        onClick={() => {
          setIsOpen(false)
        }}
      ></div>
    </div>
  )
}
