import {
  ShopItems,
  ShopUpgrades,
  Upgrade,
} from '@/features/clicker/clickerTypes'
export const BASE_SECONDS_PER_BOMB = 10

const baseItems = [
  {
    id: 'autoClicker',
    name: 'Clicker Bot Mk1',
    description: 'Auto clicks for you! Adds 1 click/s per upgrade.',
    price: 80,
    multiplier: 1,
    amount: 0,
    maxAmount: 25,
    priceMultiplier: 2,
    info: {
      prefix: 'Clicks:',
      operator: '+',
      unit: '/s',
    },
  },
  {
    id: 'autoClicker2',
    name: 'Clicker Bot Mk2',
    description: 'Auto clicks for you! Adds 10 click/s per upgrade.',
    price: 3_000_000_000,
    multiplier: 10,
    amount: 0,
    maxAmount: 25,
    priceMultiplier: 2,
    requires: {
      id: 'autoClicker',
      amount: 25,
    },
    info: {
      prefix: 'Clicks:',
      operator: '+',
      unit: '/s',
    },
  },
  {
    id: 'clickMultiplier',
    name: 'Click Value',
    description: 'Multiplies click value by 2, including Clicker Bots clicks!',
    price: 100,
    multiplier: 2,
    amount: 0,
    maxAmount: 50,
    priceMultiplier: 4,
    requires: {
      id: 'autoClicker',
      amount: 2,
    },
    info: {
      prefix: 'Value:',
      operator: 'x',
      unit: '',
    },
  },
  {
    id: 'volunteerClicking',
    name: 'Volunteer Clicking',
    description:
      'Volunteers will Auto Click too! Increases Auto Clicker income by 0.1% per Volunteer per upgrade.',
    price: 1000,
    multiplier: 0.001,
    amount: 0,
    maxAmount: 20,
    priceMultiplier: 5,
    requires: {
      id: 'autoClicker',
      amount: 5,
    },
    info: {
      prefix: 'Buff:',
      operator: '+',
      unit: '%',
    },
  },
  {
    id: 'goldMine',
    name: 'Gold mine',
    description:
      'Winning a round of Mine Sweeper earns you coins! +1 second of income per mine per upgrade.',
    price: 120,
    multiplier: 1,
    amount: 0,
    maxAmount: 20,
    priceMultiplier: 4,
    requires: {
      id: 'autoClicker',
      amount: 5,
    },
    info: {
      prefix: 'Prize/mine:',
      operator: '+',
      unit: 's',
    },
  },
]

export function generateUpgrades() {
  const upgrades: ShopUpgrades = {}
  baseItems.forEach((item) => {
    const newUpgrade: Upgrade = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      multiplier: item.multiplier,
      amount: item.amount,
      maxAmount: item.maxAmount,
      priceMultiplier: item.priceMultiplier,
      info: item.info,
      requires: item.requires,
    }
    upgrades[item.id] = newUpgrade
  })

  return upgrades
}

export function shouldShowUpgrade(
  upgrade: Upgrade,
  playerUpgrades: ShopUpgrades,
) {
  if (upgrade.requires) {
    const { id, amount } = upgrade.requires
    return playerUpgrades[id].amount >= amount
  }
  return true
}

export function getUpgradeValue(
  upgrade: Upgrade,
  items?: ShopItems,
  single = false,
) {
  const { info, multiplier, amount } = upgrade
  const amountToUse = single ? 1 : amount

  switch (upgrade.id) {
    case 'clickMultiplier':
      return multiplier ** amountToUse
    case 'volunteerClicking':
      if (!items) return 0
      return `${
        Math.round(amountToUse * multiplier * items.volunteer.amount * 10000) /
        100
      }${info.unit}`
    case 'goldMine':
      return `${
        (single ? 0 : BASE_SECONDS_PER_BOMB) + multiplier * amountToUse
      }${info.unit}`
    default:
      return `${multiplier * amountToUse}${info.unit}`
  }
}

export const shopUgrades = generateUpgrades()
