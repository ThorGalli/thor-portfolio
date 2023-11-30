import { LoopControl, ClickerState } from '@/features/clicker/clickerTypes'
import { generateItems, shopItems } from './items'
import { generateUpgrades, shopUgrades } from './upgrades'
import { generateAchievements } from './achievements'

export function getInitialControl(): LoopControl {
  return {
    lastClickTime: performance.now(),
    estimatedClicksIncome: 0,
    lastFrameTime: performance.now(),
    lastClickUpdate: performance.now(),
    lastSaveTime: performance.now(),
    last5Clicks: [0, 0, 0, 0, 0],
  }
}
export function getInitialClicker(): ClickerState {
  return {
    items: generateItems(),
    upgrades: generateUpgrades(),
    coins: {
      fromClicks: 0,
      fromAuto: 0,
      fromResources: 0,
      fromSweeper: 0,
      spent: 0,
    },
    clicks: 0,
    offlineTime: 0,
    achievements: generateAchievements(),
  }
}

export function copy(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}
