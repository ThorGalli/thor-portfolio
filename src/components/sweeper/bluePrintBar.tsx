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
  const { short } = useClickerCalculations()
  const { resourceIncome } = useClickerContext()

  const prize = useMemo(() => {
    // const incomeBuff = Math.round(resourceIncome ** (1 / 2) / 100)
    // const incomeMultiplier = 1 + incomeBuff / 100
    const seconds = calculatePrizeSeconds(blueprint.bombAmount)
    const value = seconds * resourceIncome

    return {
      value,
      display: short(value, 2),
      seconds: secondsToShortTime(seconds),
    }
  }, [blueprint, resourceIncome])

  const handleClick = () => {
    onClick?.()
    onSelect?.(index, prize?.value)
  }

  function secondsToShortTime(seconds: number) {
    if (seconds < 60) return seconds + 's'
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm'
    if (seconds < 86400)
      return (
        Math.floor(seconds / 3600) +
        'h ' +
        Math.floor((seconds % 3600) / 60) +
        'm'
      )
    return (
      Math.floor(seconds / 86400) +
      'd ' +
      Math.floor((seconds % 86400) / 3600) +
      'h'
    )
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
            <span className="text-stone-400">({prize.seconds}) </span>
            {prize.display}
          </p>
          <BaseCoin size={20} />
        </div>
      </div>
      {children}
    </button>
  )
}
