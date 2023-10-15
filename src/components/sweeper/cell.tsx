'use client'
import { useSweeperContext } from '@/contexts/useSweeperContext'
import { Cell } from '@/features/minesweeper/types'
import { useMemo } from 'react'

export default function CellBox({
  cell,
  onReavelCell,
  onFlagCell,
}: {
  cell: Cell
  onReavelCell: (cell: Cell) => void
  onFlagCell: (cell: Cell) => void
}) {
  const { isBomb, isRevealed, isFlagged, surroundingBombs } = cell
  const { losingCellID } = useSweeperContext()

  const isEven = useMemo(() => {
    return (cell.x + cell.y) % 2 === 0
  }, [cell.id])

  const getClassNames = useMemo(() => {
    const base =
      'flex h-7 min-w-[1.75rem] flex-col items-center justify-around disabled:cursor-default'

    if (cell.id === losingCellID) return `${base} bg-red-500`

    const bg = isEven
      ? 'bg-slate-800 disabled:bg-zinc-600 hover:bg-stone-400'
      : 'bg-slate-950 disabled:bg-zinc-700 hover:bg-stone-500'

    return `${base} ${bg}`
  }, [isEven, losingCellID])

  const textColor = useMemo(() => {
    switch (surroundingBombs) {
      case 1:
        return 'text-blue-500'
      case 2:
        return 'text-green-500'
      case 3:
        return 'text-yellow-500'
      case 4:
        return 'text-orange-400'
      case 5:
        return 'text-red-500'
      case 6:
        return 'text-purple-500'
      case 7:
        return 'text-pink-500'
      case 8:
        return 'text-black'
      default:
        return 'text-gray-500'
    }
  }, [surroundingBombs])

  const value = useMemo(() => {
    if (isBomb) return '💣'
    return surroundingBombs
  }, [isBomb, surroundingBombs])

  return (
    <button
      className={getClassNames}
      onClick={() => onReavelCell(cell)}
      onContextMenu={(e) => {
        e.preventDefault()
        onFlagCell(cell)
      }}
      disabled={isRevealed}
    >
      {isRevealed && <p className={textColor}>{value}</p>}
      {isFlagged && '🚩'}
    </button>
  )
}
