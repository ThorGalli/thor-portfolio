import {
  ShopItems,
  ShopUpgrades,
  Upgrade,
  UpgradeStatus,
} from '@/features/clicker/clickerTypes'
import { getTotalTiers } from './items'
import { ShopAchievements, getProgress } from './achievements'
export const BASE_SECONDS_PER_BOMB = 10

const M = 1_000_000
const B = 1_000_000_000
const T = 1_000_000_000_000
const Qa = 1_000_000_000_000_000

const baseUpgrades: Upgrade[] = [
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
    requirements: [
      {
        source: 'achievement',
        id: 'clicker10',
      },
    ],
  },
  {
    id: 'autoClicker2',
    name: 'Clicker Bot Mk2',
    description: 'Auto clicks for you! Adds 10 click/s per upgrade.',
    price: 3 * M,
    multiplier: 10,
    amount: 0,
    maxAmount: 25,
    priceMultiplier: 2,
    requirements: [
      {
        source: 'achievement',
        id: 'complete_clickerbot_1',
      },
      {
        source: 'achievement',
        id: 'clicker100',
      },
    ],
    info: {
      prefix: 'Clicks:',
      operator: '+',
      unit: '/s',
    },
  },
  {
    id: 'autoClicker3',
    name: 'Clicker Bot Mk3',
    description: 'Auto clicks for you! Adds 100 click/s per upgrade.',
    price: 120 * T,
    multiplier: 100,
    amount: 0,
    maxAmount: 25,
    priceMultiplier: 2.5,
    requirements: [
      {
        source: 'achievement',
        id: 'complete_clickerbot_2',
      },
      {
        source: 'achievement',
        id: 'clicker1000',
      },
    ],
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
    requirements: [
      {
        source: 'achievement',
        id: 'clicker100',
      },
    ],
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
    requirements: [
      {
        source: 'achievement',
        id: 'clicker1000',
      },
    ],
    info: {
      prefix: 'Buff:',
      operator: '+',
      unit: '%',
    },
  },
  {
    id: 'achievement_25',
    name: 'Trophy Buff',
    description: 'Increases ALL income by +1% per Achievement unlocked.',
    price: 500 * T,
    multiplier: 0.01,
    amount: 0,
    maxAmount: 1,
    priceMultiplier: 1,
    requirements: [
      {
        source: 'achievement',
        id: 'achievement_25',
      },
    ],
    info: {
      prefix: 'Buff:',
      operator: '+',
      unit: '%',
    },
  },
  {
    id: 'totalTier1',
    name: 'Tiered-Up I',
    description: 'Increases income by +0,1% per Tier Level accumulated.',
    price: 2 * M,
    multiplier: 0.001,
    amount: 0,
    maxAmount: 1,
    priceMultiplier: 1,
    requirements: [
      {
        source: 'achievement',
        id: 'totalTier1',
      },
    ],
    info: {
      prefix: 'Buff:',
      operator: '+',
      unit: '%',
    },
  },
  {
    id: 'totalTier2',
    name: 'Tiered-Up II',
    description: 'Increases income by +0,1% per Tier Level accumulated.',
    price: 100 * M,
    multiplier: 0.001,
    amount: 0,
    maxAmount: 1,
    priceMultiplier: 1,
    requirements: [
      {
        source: 'achievement',
        id: 'totalTier2',
      },
    ],
    info: {
      prefix: 'Buff:',
      operator: '+',
      unit: '%',
    },
  },
  {
    id: 'totalTier3',
    name: 'Tiered-Up III',
    description: 'Increases income by +0,2% per Tier Level accumulated.',
    price: 5 * T,
    multiplier: 0.002,
    amount: 0,
    maxAmount: 1,
    priceMultiplier: 1,
    requirements: [
      {
        source: 'achievement',
        id: 'totalTier3',
      },
    ],
    info: {
      prefix: 'Buff:',
      operator: '+',
      unit: '%',
    },
  },
  {
    id: 'totalTier4',
    name: 'Tiered-Up IV',
    description: 'Increases income by +0,2% per Tier Level accumulated.',
    price: 250 * T,
    multiplier: 0.002,
    amount: 0,
    maxAmount: 1,
    priceMultiplier: 1,
    requirements: [
      {
        source: 'achievement',
        id: 'totalTier4',
      },
    ],
    info: {
      prefix: 'Buff:',
      operator: '+',
      unit: '%',
    },
  },
  {
    id: 'totalTier5',
    name: 'Tiered-Up V',
    description: 'Increases income by +0,3% per Tier Level accumulated.',
    price: 12.5 * Qa,
    multiplier: 0.003,
    amount: 0,
    maxAmount: 1,
    priceMultiplier: 1,
    requirements: [
      {
        source: 'achievement',
        id: 'totalTier5',
      },
    ],
    info: {
      prefix: 'Buff:',
      operator: '+',
      unit: '%',
    },
  },
  {
    id: 'totalTier6',
    name: 'Tiered-Up VI',
    description: 'Increases income by +0,3% per Tier Level accumulated.',
    price: 625 * Qa,
    multiplier: 0.003,
    amount: 0,
    maxAmount: 1,
    priceMultiplier: 1,
    requirements: [
      {
        source: 'achievement',
        id: 'totalTier6',
      },
    ],
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
    requirements: [
      {
        source: 'upgrade',
        id: 'autoClicker',
        amount: 5,
      },
    ],
    info: {
      prefix: 'Prize/mine:',
      operator: '+',
      unit: 's',
    },
  },
]

export const getTotalTiersMultiplier = (
  items: ShopItems,
  upgrades: ShopUpgrades,
) => {
  const {
    totalTier1,
    totalTier2,
    totalTier3,
    totalTier4,
    totalTier5,
    totalTier6,
  } = upgrades
  const bonuses =
    totalTier1.amount * totalTier1.multiplier +
    totalTier2.amount * totalTier2.multiplier +
    totalTier3.amount * totalTier3.multiplier +
    totalTier4.amount * totalTier4.multiplier +
    totalTier5.amount * totalTier5.multiplier +
    totalTier6.amount * totalTier6.multiplier

  return 1 + bonuses * getTotalTiers(items)
}

export const getAchievementsMultiplier = (
  achievements: ShopAchievements,
  upgrades: ShopUpgrades,
) => {
  const { achievement_25: achievment25 } = upgrades
  const { completed } = getProgress(achievements)
  return 1 + achievment25.amount * achievment25.multiplier * completed
}

export function generateUpgrades() {
  const upgrades: ShopUpgrades = {}
  baseUpgrades.forEach((item) => {
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
      requirements: item.requirements,
    }
    upgrades[item.id] = newUpgrade
  })

  return upgrades
}

export function filterByUpgradeStatus(
  upgrade: Upgrade,
  selecedStatus: UpgradeStatus,
) {
  switch (selecedStatus) {
    case UpgradeStatus.COMPLETED:
      return isCompleted(upgrade)
    case UpgradeStatus.AVAILABLE:
      return !isCompleted(upgrade)
    default:
      return true
  }
}

export function isCompleted(upgrade: Upgrade) {
  return upgrade.amount >= upgrade.maxAmount
}

export function getUpgradeValue(
  upgrade: Upgrade,
  items?: ShopItems,
  achievements?: ShopAchievements,
  single = false,
) {
  const { info, multiplier, amount } = upgrade
  const amountToUse = single ? 1 : amount

  if (upgrade.id.includes('totalTier') && items) {
    return `${(getTotalTiers(items) * multiplier * 100).toFixed(2)}${info.unit}`
  }

  switch (upgrade.id) {
    case 'achievement_25':
      if (!achievements) return 0
      return `${getProgress(achievements).completed * multiplier * 100}${
        info.unit
      }`
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
