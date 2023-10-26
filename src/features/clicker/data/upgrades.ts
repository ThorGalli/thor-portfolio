import { ShopItems, Upgrade } from '@/features/clicker/clickerTypes'
export const BASE_SECONDS_PER_BOMB = 10
export const shopUgrades = {
  autoClicker: {
    id: 'autoClicker',
    name: 'Auto Clicker',
    description: 'Auto clicks for you! Adds 1 click/s per upgrade.',
    price: 80,
    multiplier: 1,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 2,
  },
  clickMultiplier: {
    id: 'clickMultiplier',
    name: 'Click Multiplier',
    description: 'Multiplies click value by 2, including Auto Clicker clicks!',
    price: 200,
    multiplier: 2,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 3,
  },
  goldMine: {
    id: 'goldMine',
    name: 'Gold mine',
    description:
      'Winning a round of Mine Sweeper earns you coins! +1 second of income per mine per upgrade.',
    price: 100,
    multiplier: 1,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 3.5,
  },
  volunteerClicking: {
    id: 'volunteerClicking',
    name: 'Volunteer Clicking',
    description:
      'Volunteers will Auto Click too! Increases Auto Clicker income by 0.1% per Volunteer per upgrade.',
    price: 200,
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
          value: buyable.amount * buyable.multiplier,
        },
      ]
    case 'clickMultiplier':
      return [
        {
          prefix: 'Current multiplier:',
          value: buyable.multiplier ** buyable.amount,
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
    case 'goldMine':
      return [
        {
          prefix: 'Base prize/bomb:',
          value: `${BASE_SECONDS_PER_BOMB}s`,
        },
        {
          prefix: 'Extra prize/bomb:',
          value: `+${buyable.amount * buyable.multiplier}s`,
        },
        {
          prefix: 'Current prize/bomb:',
          value: `${
            BASE_SECONDS_PER_BOMB + buyable.amount * buyable.multiplier
          }s`,
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
