'use client'

import { StageBlueprint } from '@/features/minesweeper/types'

export default function BluePrintBar({
  className,
  index,
  blueprint,
  onSelect,
  onClick,
  children,
  prizeDisplay,
  small,
}: {
  className: string
  index: number
  blueprint: StageBlueprint
  onSelect?: (index: number) => void
  onClick?: () => void
  children?: React.ReactNode
  prizeDisplay: { value: number; display: string; seconds: string }
  small?: boolean
}) {
  const handleClick = () => {
    onClick?.()
    onSelect?.(index)
  }

  if (small)
    return (
      <button
        onClick={handleClick}
        className="btn-slate-light rounded-md px-2 transition-all duration-200 lg:h-8"
      >
        <div className="my-auto flex gap-2">
          <p id="stageName" className="text-yellow-200 ">
            ⚙️{blueprint.name}
          </p>
          <div className="price-tag">
            <p>
              <span className="text-stone-400">({prizeDisplay.seconds}) </span>+
              {prizeDisplay.display} 💰
            </p>
          </div>
        </div>
      </button>
    )

  return (
    <button
      onClick={handleClick}
      className={className + ' transition-all duration-200 '}
    >
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
            <span className="text-stone-400">({prizeDisplay.seconds}) </span>+
            {prizeDisplay.display} 💰
          </p>
        </div>
      </div>
      {children}
    </button>
  )
}
