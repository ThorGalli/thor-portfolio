import { useState } from 'react'
import { ClickerState } from '../clickerTypes'

import { useToast } from '@/contexts/useToast'
import { Achievement } from '../data/achievements'

const CHECK_ACHIEVEMENTS_INTERVAL = 1000

export default function useAchievements() {
  const { toast } = useToast()

  const [lastAchievementCheck, setLastAchievementCheck] = useState(
    performance.now(),
  )

  function checkForAchievements(
    gameState: ClickerState,
    setGameState: (state: Partial<ClickerState>) => void,
  ) {
    if (performance.now() - lastAchievementCheck < CHECK_ACHIEVEMENTS_INTERVAL)
      return

    const newAchievements = { ...gameState.achievements }
    let newAchievementsUnlocked = false

    Object.values(newAchievements).forEach((achievement) => {
      if (!achievement.unlocked && achievement.criteria(gameState)) {
        toast({
          id: achievement.id,
          message: <AchievementBox achievement={achievement} />,
          duration: 8000,
        })
        achievement.unlocked = true
        newAchievementsUnlocked = true
      }
    })

    if (newAchievementsUnlocked) {
      setGameState({
        achievements: newAchievements,
      })
    }

    setLastAchievementCheck(performance.now())
  }

  return {
    checkForAchievements,
  }
}

function AchievementBox({
  achievement,
}: {
  achievement: Readonly<Achievement>
}) {
  return (
    <div className="flex items-center gap-2 text-yellow-200">
      <p className="text-2xl">{achievement.emoji}</p>
      <p className="flex flex-col">
        <span className="text-yellow-200">{achievement.name}</span>
        <span className="wrap mb-1 text-xs leading-tight">
          {achievement.description}
        </span>
      </p>
    </div>
  )
}
