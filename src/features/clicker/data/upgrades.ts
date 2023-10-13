import { ShopItems, Upgrade } from '@/types'

export const shopUgrades = {
  autoClicker: {
    id: 'autoClicker',
    name: 'Auto Clicker',
    description: 'Auto clicks for you! Adds 1 click/s per upgrade.',
    price: 50,
    multiplier: 1,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 2,
  },
  clickMultiplier: {
    id: 'clickMultiplier',
    name: 'Click Multiplier',
    description: 'Multiplies click value by 2, including Auto Clicker clicks!',
    price: 120,
    multiplier: 2,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 4,
  },
  volunteerClicking: {
    id: 'volunteerClicking',
    name: 'Volunteer Clicking',
    description:
      'Volunteers will Auto Click too! Increases Auto Clicker income by 0.1% per Volunteer per upgrade.',
    price: 180,
    multiplier: 0.001,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 5,
  },
}

export function getUpgradeInfo(buyable: Upgrade, items: ShopItems) {
  switch (buyable.id) {
    case 'autoClicker':
      return [
        {
          prefix: 'Current clicks/s:',
          value: `${buyable.amount * buyable.multiplier}`,
        },
      ]
    case 'clickMultiplier':
      return [
        {
          prefix: 'Current multiplier:',
          value: `x${Math.pow(buyable.multiplier, buyable.amount)}`,
        },
      ]
    case 'volunteerClicking':
      return [
        {
          prefix: 'Buff per Volunteer:',
          value:
            Math.round(buyable.amount * buyable.multiplier * 10000) / 100 + '%',
        },
        {
          prefix: 'Volunteers Amount:',
          value: items.volunteer.amount,
        },
        {
          prefix: 'Current increase:',
          value: `+${
            Math.round(
              buyable.amount *
                buyable.multiplier *
                items.volunteer.amount *
                10000,
            ) / 100
          }%`,
        },
      ]
    default:
      return [
        {
          prefix: 'Current multiplier:',
          value: `${buyable.amount * buyable.multiplier}`,
        },
      ]
  }
}
