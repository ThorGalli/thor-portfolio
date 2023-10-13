import { LoopControl, GameState } from '@/types'
import { shopItems } from './items'
import { shopUgrades } from './upgrades'

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
export function getInitialGame(): GameState {
  return {
    items: copy(shopItems),
    upgrades: copy(shopUgrades),
    coins: {
      fromClicks: 0,
      fromAuto: 0,
      fromResources: 0,
      spent: 0,
    },
    offlineTime: 0,
  }
}

export function copy(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}
