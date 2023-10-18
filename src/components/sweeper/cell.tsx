'use client'
import { useSweeperContext } from '@/contexts/useSweeperContext'
import { Cell } from '@/features/minesweeper/types'
import { useMemo } from 'react'

export default function CellBox({
  cell,
  onReavelCell,
  onFlagCell,
  onRevealAround,
}: {
  cell: Cell
  onReavelCell: (cell: Cell) => void
  onFlagCell: (cell: Cell) => void
  onRevealAround: (cell: Cell) => void
}) {
  const {
    isBomb,
    isRevealed,
    isFlagged,
    bombsAround,
    flagsAround,
    revealedAround,
    cellsAround,
  } = cell
  const { losingCellID } = useSweeperContext()
  const isResolved = flagsAround + revealedAround === cellsAround
  const isEven = useMemo(() => {
    return (cell.x + cell.y) % 2 === 0
  }, [cell.id])

  const getClassNames = useMemo(() => {
    const base = 'flex h-7 min-w-[1.75rem] flex-col items-center justify-around'

    if (cell.id === losingCellID) return `${base} bg-red-500`
    let bg = ''

    if (isResolved && isRevealed) {
      bg = isEven ? 'bg-gray-600 cursor-default' : 'bg-gray-700 cursor-default'
      return `${base} ${bg}`
    }

    if (isRevealed) {
      bg = isEven
        ? 'bg-stone-600 hover:bg-opacity-50'
        : 'bg-stone-700 hover:bg-opacity-50'
      return `${base} ${bg}`
    }

    bg = isEven
      ? 'bg-slate-800 hover:bg-stone-400'
      : 'bg-slate-950 hover:bg-stone-500'

    return `${base} ${bg}`
  }, [isEven, losingCellID, isRevealed, isResolved])

  const textColor = useMemo(() => {
    switch (bombsAround) {
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
  }, [bombsAround])

  const value = useMemo(() => {
    if (isBomb) return '💣'
    return bombsAround
  }, [isBomb, bombsAround])

  function handleReveal() {
    if (isFlagged) return
    if (isRevealed) return onRevealAround(cell)
    return onReavelCell(cell)
  }

  return (
    <button
      className={getClassNames}
      onClick={handleReveal}
      onContextMenu={(e) => {
        e.preventDefault()
        onFlagCell(cell)
      }}
    >
      {isRevealed && <p className={textColor}>{value || ''}</p>}
      {isFlagged && '🚩'}
    </button>
  )
}
