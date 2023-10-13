import { shopItems } from './features/clicker/data/items'
import { shopUgrades } from './features/clicker/data/upgrades'

export type Buyable = {
  id: string
  name: string
  price: number
  priceMultiplier: number
  description: string
  amount: number
}

export type Item = {
  income: number
} & Buyable

export type ShopItems = {
  [key: string]: Item
}

export type Upgrade = {
  multiplier: number
  maxAmount: number
} & Buyable

export type ShopUpgrades = {
  [key: string]: Upgrade
}

export type Coins = {
  fromClicks: number
  fromAuto: number
  fromResources: number
  spent: number
}

export type GameContextProps = {
  items: ShopItems
  upgrades: ShopUpgrades
  buy: (buyable: Item | Upgrade) => void
  getAdjustedPrice: (buyable: Item | Upgrade) => number
  totalCoins: number
  resourceIncome: number
  autoIncome: number
  clicksIncome: number
  onClickCoin: () => void
  onSave: () => void
  loading: boolean
  deleteGameData: () => void
  lastSaveTime: number
}

export type LoopControl = {
  lastClickTime: number
  estimatedClicksIncome: number
  lastFrameTime: number
  lastClickUpdate: number
  lastSaveTime: number
  last5Clicks: number[]
}

export type GameState = {
  items: ShopItems
  upgrades: ShopUpgrades
  coins: Coins
  offlineTime: number
  shouldReset?: boolean
}
