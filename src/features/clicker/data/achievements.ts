import { ClickerState } from '../clickerTypes'

export type Achievement = {
  id: string
  name: string
  description: string
  unlocked: boolean
  criteria: (gameState: ClickerState) => boolean
}
export type ShopAchievements = {
  [key: string]: Achievement
}

export const baseAchievements: Achievement[] = [
  {
    id: 'clicker-1',
    name: 'Hello Clicker',
    description: 'Click the Coin',
    unlocked: false,
    criteria: (gameState) => gameState.clicks >= 1,
  },

  {
    id: 'clicker-10',
    name: '10 Clicks',
    description: 'Click the button 10 times',
    unlocked: false,
    criteria: (gameState) => gameState.clicks >= 10,
  },
  {
    id: 'clicker-100',
    name: '100 Clicks',
    description: 'Click the button 100 times',
    unlocked: false,
    criteria: (gameState) => gameState.clicks >= 100,
  },
]

export function generateAchievements() {
  const achievements: ShopAchievements = {}
  baseAchievements.forEach((achievement) => {
    achievements[achievement.id] = achievement
  })

  return achievements
}

export const shopAchievements = generateAchievements()
