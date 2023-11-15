import { GameStatus } from '../types'

export default function GameHeader({
  totalRevealedCells,
  totalSafeCells,
  totalFlaggedCells,
  totalBombs,
  gameStatus,
  promptRestartGame,
  bombsClicked,
  children,
}: {
  totalRevealedCells: number
  totalSafeCells: number
  totalFlaggedCells: number
  totalBombs: number
  gameStatus: GameStatus
  promptRestartGame: () => void
  bombsClicked: string[]
  children?: React.ReactNode
}) {
  const hasStarted = gameStatus !== GameStatus.NOT_STARTED
  if (!hasStarted) return null
  const currentHearts = 3 - bombsClicked.length
  const currentSkulls = bombsClicked.length

  function currentHealth() {
    const hearts = '❤️'.repeat(currentHearts)
    const skulls = '💀'.repeat(currentSkulls)
    return hearts + skulls
  }

  return (
    <div className="fixed top-0 flex w-full max-w-screen-2xl flex-col border-b-2 border-slate-950 bg-slate-800 px-2 pt-2 text-yellow-200 lg:top-12 lg:mx-auto">
      <div>{children}</div>
      <div className="flex h-8 w-full items-center justify-between leading-none lg:justify-around">
        <p>
          ✅ {totalRevealedCells}/{totalSafeCells}
        </p>
        <button
          className="white-hover absolute left-1/2 flex w-fit -translate-x-1/2 transform text-xl active:opacity-70"
          onClick={promptRestartGame}
        >
          {gameStatus === GameStatus.WON ? '😎' : currentHealth()}
        </button>
        <p>
          {totalFlaggedCells}/{totalBombs} 🚩
        </p>
      </div>
    </div>
  )
}
