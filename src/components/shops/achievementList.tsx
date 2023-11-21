import { Achievement, getProgress } from '@/features/clicker/data/achievements'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { useDisclosure } from '@/hooks/useDisclosure'
import ConfirmationDialog from '../settings/confirmationDialog'
import { useState } from 'react'

export default function AchievementList() {
  const { achievements } = useClickerContext()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null)

  function handleClickAchievement(achievement: Achievement) {
    setSelectedAchievement(achievement)
    onOpen()
  }

  const { completed, total } = getProgress(achievements)
  const percentCompleted = (completed / total) * 100

  return (
    <div className="flex flex-col gap-2">
      <header className="header-slate">
        <p>Achievements</p>
        <div className="relative h-6 w-full overflow-clip rounded-sm bg-slate-950">
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-200">
            {completed}/{total}
          </p>
          <div
            className="h-full bg-yellow-900 transition-all duration-500"
            style={{ width: percentCompleted + '%' }}
          />
        </div>
      </header>
      <div className="grid w-full grid-cols-1 gap-2">
        {Object.values(achievements).map((achiev) => {
          return (
            <AchievementBlock
              key={achiev.id}
              achievement={achiev}
              onClick={handleClickAchievement}
            />
          )
        })}
      </div>
      <ConfirmationDialog
        isOpen={isOpen}
        confirmAnswer="Close"
        confirmQuestion={
          <p>
            <span className="text-yellow-400">
              {selectedAchievement?.unlocked ? '🏆' : '🔒'}{' '}
              {selectedAchievement?.name}
            </span>
            <br />
            {selectedAchievement?.description}
          </p>
        }
        onCancel={onClose}
        onConfirm={onClose}
        hideCancel
        variant={selectedAchievement?.unlocked ? 'prize' : 'default'}
      />
    </div>
  )
}

type AchievementBlockProps = {
  achievement: Achievement
  onClick: (achievement: Achievement) => void
}

function AchievementBlock({
  achievement,
  onClick,
}: Readonly<AchievementBlockProps>) {
  const unlockedStyle =
    ' border-yellow-950 bg-yellow-900 text-yellow-200 hover:bg-yellow-700 hover:border-yellow-900 active:bg-yellow-950 '
  const lockedStyle =
    ' border-slate-600 bg-slate-600 text-slate-200 hover:bg-slate-500 hover:border-slate-700 active:bg-slate-600 '
  const blockClass = achievement.unlocked ? unlockedStyle : lockedStyle
  const baseClass = 'transition-all duration-lock flex rounded-md p-1'

  return (
    <button
      className={baseClass + blockClass}
      onClick={() => onClick(achievement)}
    >
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
        {achievement.name}
      </p>
    </button>
  )
}
