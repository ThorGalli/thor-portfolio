'use client'

import { useClickerContext } from '@/features/clicker/useClickerContext'
import { useToast } from '@/contexts/useToast'

export default function SaveGameButton() {
  const { onSave, loading, lastSaveTime } = useClickerContext()
  const timeSinceLastSave = (performance.now() - lastSaveTime) / 1000

  const saveInterval = 10
  const canSaveAgain = timeSinceLastSave > saveInterval

  const width =
    timeSinceLastSave > saveInterval
      ? 0
      : (timeSinceLastSave / saveInterval) * 100

  const textColor = !canSaveAgain || loading ? 'text-teal-200' : ''
  const { toast } = useToast()

  return (
    <button
      className={'btn-yellow relative overflow-hidden rounded-md px-2 py-2'}
      onClick={() => {
        onSave()
        toast('Game Saved!')
      }}
      disabled={!canSaveAgain || loading}
    >
      <div
        className={'absolute left-0 top-0 z-10 h-full bg-slate-700'}
        style={{ width: `${width}%` }}
      />
      <p className={'relative z-10 ' + textColor}>
        {loading && 'Loading...'}
        {!loading && canSaveAgain ? 'Save Game' : 'Just Saved!'}
      </p>
    </button>
  )
}
