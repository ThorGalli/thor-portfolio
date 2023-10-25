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
  fromSweeper: number
  spent: number
}

export type ClickerContextProps = {
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
  onWinMineSweeper: (prize: number) => void
  loading: boolean
  saving: boolean
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

export type ClickerState = {
  items: ShopItems
  upgrades: ShopUpgrades
  coins: Coins
  offlineTime: number
  shouldReset?: boolean
}
