import { Buyable } from './buyable'

export type Upgrade = {
  multiplier: number
  maxAmount: number
} & Buyable

export type ShopUpgrades = {
  [key: string]: Upgrade
}

export const shopUgrades = {
  hoverClicker: {
    id: 'hoverClicker',
    name: 'Hover Clicker',
    description: 'Generates coins while hovering the button',
    price: 50,
    multiplier: 2,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 5,
  },
  clickMultiplier: {
    id: 'clickMultiplier',
    name: 'Click Multiplier',
    description: 'Multiplies the value of the clicks (works with hover!)',
    price: 100,
    multiplier: 2,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 10,
  },
}
