'use client'

import { useClickerContext } from '@/contexts/useClickerContext'

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

  return (
    <button
      className={'btn-yellow relative overflow-hidden rounded-md border-2 px-2'}
      onClick={onSave}
      disabled={!canSaveAgain || loading}
    >
      <div
        className={'absolute left-0 z-10 h-full bg-slate-800'}
        style={{ width: `${width}%` }}
      ></div>
      <p className={'relative z-20 ' + textColor}>
        {loading && 'Loading...'}
        {!loading && canSaveAgain ? 'Save Game' : 'Just Saved!'}
      </p>
    </button>
  )
}
