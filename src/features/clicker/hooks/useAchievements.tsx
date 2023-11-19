import { useState } from 'react'
import { ClickerState } from '../clickerTypes'

import { useToast } from '@/contexts/useToast'

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

    Object.entries(newAchievements).forEach(([_key, achievement]) => {
      if (!achievement.unlocked && achievement.criteria(gameState)) {
        toast({
          message: (
            <p>
              Achievement Unlocked: {achievement.name}
              <br />
              {achievement.description}
            </p>
          ),
          variant: 'info',
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
