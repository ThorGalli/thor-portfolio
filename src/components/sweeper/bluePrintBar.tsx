'use client'

import { StageBlueprint } from '@/features/minesweeper/types'
import BaseCoin from '../coins/baseCoins'

export default function BluePrintBar({
  className,
  index,
  blueprint,
  onSelect,
  onClick,
  children,
  prizeDisplay,
}: {
  className: string
  index: number
  blueprint: StageBlueprint
  onSelect?: (index: number) => void
  onClick?: () => void
  children?: React.ReactNode
  prizeDisplay: { value: number; display: string; seconds: string }
}) {
  const handleClick = () => {
    onClick?.()
    onSelect?.(index)
  }

  return (
    <button onClick={handleClick} className={className}>
      <p
        className="ml-2 font-bold text-red-400"
        style={{ textShadow: '0 0 10px black' }}
      >
        {blueprint.bombAmount} 💣
      </p>
      <div className="flex flex-col items-end">
        <p id="stageName" className="text-lg text-yellow-200">
          {blueprint.name}{' '}
          <span id="stageSize" className="text-stone-300">
            [{blueprint.size + 'x' + blueprint.size}]
          </span>
        </p>
        <div className="price-tag">
          <p>
            <span className="text-stone-400">({prizeDisplay.seconds}) </span>
            {prizeDisplay.display}
          </p>
          <BaseCoin size={20} />
        </div>
      </div>
      {children}
    </button>
  )
}
