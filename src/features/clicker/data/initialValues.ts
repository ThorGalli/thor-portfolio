import { LoopControl, ClickerState } from '@/features/clicker/clickerTypes'
import { shopItems } from './items'
import { shopUgrades } from './upgrades'
import { shopAchievements } from './achievements'

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
    items: copy(shopItems),
    upgrades: copy(shopUgrades),
    coins: {
      fromClicks: 0,
      fromAuto: 0,
      fromResources: 0,
      fromSweeper: 0,
      spent: 0,
    },
    clicks: 0,
    offlineTime: 0,
    achievements: shopAchievements,
  }
}

export function copy(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}
