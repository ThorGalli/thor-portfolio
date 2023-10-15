'use client'
import { useClickerContext } from '@/contexts/useClickerContext'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import useMineSweeperCalculations from '@/features/minesweeper/hooks/useMineSweeperCalculations'
import { StageBlueprint } from '@/features/minesweeper/types'
import { useMemo } from 'react'
import BaseCoin from '../coins/baseCoins'

export default function BluePrintBar({
  className,
  index,
  blueprint,
  onSelect,
  onClick,
  children,
}: {
  className: string
  index: number
  blueprint: StageBlueprint
  onSelect?: (index: number, prize: number) => void
  onClick?: () => void
  children?: React.ReactNode
}) {
  const { calculatePrizeSeconds } = useMineSweeperCalculations()
  const { resourceIncome } = useClickerContext()

  const prizePreview = useMemo(() => {
    const seconds = calculatePrizeSeconds(blueprint.bombAmount)
    const prize = seconds * resourceIncome
    return { prize, seconds: Math.floor(seconds) }
  }, [blueprint, resourceIncome])

  const handleClick = () => {
    onClick?.()
    onSelect?.(index, prizePreview?.prize)
  }

  const { short } = useClickerCalculations()
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
          <p>{short(prizePreview.prize, 2)}</p>
          <BaseCoin size={20} />
        </div>
      </div>
      {children}
    </button>
  )
}
