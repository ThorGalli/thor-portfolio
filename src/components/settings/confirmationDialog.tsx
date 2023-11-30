import useTwoStagesAnimation from '@/hooks/useTwoStagesAnimation'
import clsx from 'clsx'
import React from 'react'

type ConfirmationDialogProps = Readonly<{
  isOpen: boolean
  confirmQuestion: string | React.ReactNode
  confirmAnswer: string
  onConfirm: () => void
  onCancel: () => void
  hideCancel?: boolean
  variant?: 'default' | 'prize' | 'danger'
  duration?: number
}>

export default function ConfirmationDialog({
  isOpen,
  confirmQuestion,
  confirmAnswer,
  onConfirm,
  onCancel,
  hideCancel,
  variant = 'default',
  duration = 300,
}: ConfirmationDialogProps) {
  const variants = {
    default: {
      modal: 'rounded-md bg-slate-700 p-4',
      cancel: 'btn-slate rounded-md p-2',
      confirm: 'btn-orange rounded-md p-2',
      transition: 'ease-in-out',
    },
    prize: {
      modal: 'rounded-md bg-yellow-800 p-4',
      cancel: 'btn-slate rounded-md p-2',
      confirm: 'btn-yellow rounded-md p-2',
      transition: 'cubic-bezier(.96,.73,.38,1.25)',
    },
    danger: {
      modal: 'rounded-md bg-red-950 p-4',
      cancel: 'btn-slate rounded-md p-2',
      confirm: 'btn-orange rounded-md p-2',
      transition: 'ease-in-out',
    },
  }

  const { styles, animateClose } = useTwoStagesAnimation({
    isActive: isOpen,
    animStyles: {
      backdrop: { inactive: { opacity: 0 }, active: { opacity: 1 } },
      modal: {
        inactive: { opacity: 0, scale: 0, transform: 'translateY(200vh)' },
        active: { opacity: 1, scale: 1, transform: 'translateY(0)' },
      },
    },
    durationInMs: duration,
    transition: variants[variant].transition,
  })

  return (
    <div
      id="wrapper"
      onClick={hideCancel ? () => null : () => animateClose(onCancel)}
      className={clsx(
        'fixed left-0 top-0 z-20 h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm',
        isOpen ? 'flex' : 'hidden',
      )}
      style={styles.backdrop}
    >
      <div
        className={variants[variant].modal}
        onClick={(e) => e.stopPropagation()}
        style={styles.modal}
      >
        <div className="mb-4">{confirmQuestion}</div>
        <div className="z-30 flex justify-end gap-2">
          {!hideCancel && (
            <button
              className={variants[variant].cancel}
              onClick={() => animateClose(onCancel)}
            >
              Cancel
            </button>
          )}
          <button
            className={variants[variant].confirm}
            onClick={() => animateClose(onConfirm)}
          >
            {confirmAnswer}
          </button>
        </div>
      </div>
    </div>
  )
}
