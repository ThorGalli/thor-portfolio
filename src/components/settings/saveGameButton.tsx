'use client'

import { useGameContext } from '@/contexts/useGameContext'

export default function SaveGameButton() {
  const { loading, saveGame, lastSaveTime } = useGameContext()
  const timeSinceLastSave = (performance.now() - lastSaveTime) / 1000

  const saveInterval = 10
  const canSaveAgain = timeSinceLastSave > saveInterval

  const width =
    timeSinceLastSave > saveInterval
      ? 0
      : (timeSinceLastSave / saveInterval) * 100

  const buttonClass =
    canSaveAgain || loading
      ? ' text-yellow-400 cursor-pointer hover:text-yellow-200 bg-yellow-700 border-yellow-900 hover:bg-yellow-600'
      : ' text-teal-200 bg-slate-700 border-slate-800 cursor-not-allowed'
  return (
    <button
      className={
        'relative h-fit overflow-hidden rounded-md border-2 px-2 ' + buttonClass
      }
      onClick={saveGame}
    >
      <div
        className={'absolute left-0 z-10 h-full bg-slate-800 transition-all'}
        style={{ width: `${width}%` }}
      ></div>
      <p className="relative z-20">
        {loading && 'Loading...'}
        {!loading && canSaveAgain ? 'Save Game' : 'Just Saved!'}
      </p>
    </button>
  )
}
