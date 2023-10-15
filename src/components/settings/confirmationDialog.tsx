import React from 'react'

export default function ConfirmationDialog({
  isOpen,
  confirmQuestion,
  confirmAnswer,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean
  confirmQuestion: string
  confirmAnswer: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    isOpen && (
      <div
        id="wrapper"
        onClick={onCancel}
        className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm"
      >
        <div
          className="rounded-md bg-slate-700 p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="mb-4">{confirmQuestion}</p>
          <div className="z-30 flex justify-end gap-2">
            <button className="btn-slate rounded-md p-2" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn-orange rounded-md p-2" onClick={onConfirm}>
              {confirmAnswer}
            </button>
          </div>
        </div>
      </div>
    )
  )
}
