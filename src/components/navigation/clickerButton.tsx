'use client'

import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { useClickerContext } from '@/features/clicker/useClickerContext'

export default function ClickerButton({
  label,
  onClick,
  isCurrent,
}: {
  label: string | JSX.Element
  onClick: () => void
  isCurrent: boolean
}) {
  const buttonClasses = isCurrent
    ? 'lg:border-b-yellow-700 border-t-yellow-700 text-yellow-100 font-semibold'
    : 'lg:border-b-stone-700 border-t-stone-700 hover:bg-slate-700'

  const { totalCoins } = useClickerContext()
  const { short } = useClickerCalculations()
  return (
    <div
      className={
        'flex h-full flex-1 cursor-pointer items-center justify-center gap-1 border-y-4 border-transparent bg-slate-800 px-1 text-center text-lg hover:bg-slate-700 lg:border-t-transparent ' +
        buttonClasses
      }
      onClick={onClick}
    >
      {label}
      <div className="text-sm lg:text-lg">{short(totalCoins)}</div>
    </div>
  )
}
