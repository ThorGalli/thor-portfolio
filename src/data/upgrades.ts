import { Buyable } from './buyable'

export type Upgrade = {
  multiplier: number
  maxAmount: number
} & Buyable

export type ShopUpgrades = {
  [key: string]: Upgrade
}

export const shopUgrades = {
  autoClicker: {
    id: 'autoClicker',
    name: 'Auto Clicker',
    description: 'Clicks for you',
    price: 50,
    multiplier: 1,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 2,
  },
  clickMultiplier: {
    id: 'clickMultiplier',
    name: 'Click Multiplier',
    description: 'Multiplies the value of the clicks (works with hover!)',
    price: 100,
    multiplier: 2,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 5,
  },
}
