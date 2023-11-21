import { BaseItem, Item, ShopItems } from '@/features/clicker/clickerTypes'

const baseItems: BaseItem[] = [
  {
    id: 'volunteer',
    name: 'Volunteer',
    emojis: '👶👆',
    requirements: [
      {
        source: 'achievement',
        id: 'clicker10',
      },
    ],
  },
  {
    id: 'trainee',
    name: 'Trainee',
    emojis: '👦👆',
    requirements: [{ source: 'item', id: 'volunteer', amount: 1 }],
  },
  {
    id: 'juniorDev',
    name: 'Junior Developer',
    emojis: '👦💻',
    requirements: [{ source: 'item', id: 'trainee', amount: 1 }],
  },
  {
    id: 'midDev',
    name: 'Mid-level Developer',
    emojis: '🧑💻',
    requirements: [{ source: 'item', id: 'juniorDev', amount: 1 }],
  },
  {
    id: 'seniorDev',
    name: 'Senior Developer',
    emojis: '👴💻',
    requirements: [{ source: 'item', id: 'midDev', amount: 1 }],
  },

  {
    id: 'techLeader',
    name: 'Tech Leader',
    emojis: '🤵💻',
    requirements: [{ source: 'item', id: 'seniorDev', amount: 1 }],
  },
  {
    id: 'startup',
    name: 'Startup',
    emojis: '🚀💻',
    requirements: [{ source: 'achievement', id: 'unlock_startup' }],
  },
  {
    id: 'smallCompany',
    name: 'Small Company',
    emojis: '🤏🏢',
    requirements: [{ source: 'item', id: 'startup', amount: 1 }],
  },
  {
    id: 'mediumCompany',
    name: 'Medium Company',
    emojis: '🤝🏢',
    requirements: [{ source: 'item', id: 'smallCompany', amount: 1 }],
  },
  {
    id: 'bigCompany',
    name: 'Big Company',
    emojis: '💪🏢',
    requirements: [{ source: 'item', id: 'mediumCompany', amount: 1 }],
  },

  {
    id: 'corporation',
    name: 'Corporation',
    emojis: '🏢🏢',
    requirements: [{ source: 'item', id: 'bigCompany', amount: 1 }],
  },
  {
    id: 'techUnicorn',
    name: 'Tech Unicorn',
    emojis: '🦄🏢',
    requirements: [{ source: 'item', id: 'corporation', amount: 1 }],
  },
  {
    id: 'bank',
    name: 'National Bank',
    emojis: '🏠💰',
    requirements: [{ source: 'item', id: 'techUnicorn', amount: 1 }],
  },
  {
    id: 'investBank',
    name: 'Investment Bank',
    emojis: '📈💰',
    requirements: [{ source: 'item', id: 'bank', amount: 1 }],
  },
  {
    id: 'interBank',
    name: 'International Bank',
    emojis: '✈️💰',
    requirements: [{ source: 'item', id: 'investBank', amount: 1 }],
  },

  {
    id: 'ventureCapital',
    name: 'Global Conglomerate',
    emojis: '🌎💰',
    requirements: [{ source: 'item', id: 'interBank', amount: 1 }],
  },
  {
    id: 'terraformingcorp',
    name: 'Terraforming Corp',
    emojis: '🏗️🪐',
    requirements: [{ source: 'item', id: 'ventureCapital', amount: 1 }],
  },
  {
    id: 'spaceTravelCorp',
    name: 'Space Travel Corp',
    emojis: '🚀🪐',
    requirements: [{ source: 'item', id: 'terraformingcorp', amount: 1 }],
  },
  {
    id: 'spaceMiningCorp',
    name: 'Space Mining Corp',
    emojis: '⛏️🪐',
    requirements: [{ source: 'item', id: 'spaceTravelCorp', amount: 1 }],
  },
  {
    id: 'interGalacticBank',
    name: 'Inter-Planetary Bank',
    emojis: '💰🪐',
    requirements: [{ source: 'item', id: 'spaceMiningCorp', amount: 1 }],
  },
]

function generateItemBasePrice(index: number) {
  const base = 10 ** (index + 1) // 10^1, 10^2, 10^3, ...
  const multiplier = (1 + index ** 2 / 100) ** 3
  return base * multiplier
}

function generateItemIncome(index: number, price: number) {
  const base = price * 0.01
  const divider = 1 + Math.min(index / 10, 1)
  const multiplier = (1 / divider) ** index
  return base * multiplier
}

function prettyRound(num: number) {
  const charCount = Math.floor(Math.log10(num))
  const roundTo = 10 ** (charCount - 1)
  return Math.round(Math.round(num / roundTo) * roundTo)
}

export function generateItems() {
  const items: ShopItems = {}
  baseItems.forEach((item, index) => {
    const rawPrice = generateItemBasePrice(index)
    const rawIncome = generateItemIncome(index, rawPrice)

    const price = index === 0 ? rawPrice : prettyRound(rawPrice)
    const income = index === 0 ? rawIncome : prettyRound(rawIncome)

    const newItem: Item = {
      id: item.id,
      emojis: item.emojis,
      name: item.name,
      price,
      description: 'Lorem Ipsum',
      income,
      amount: 0,
      priceMultiplier: Math.min(1.15, 1.1 + index / 100),
      requirements: item.requirements,
    }

    items[item.id] = newItem

    // const prevPrice =
    //   index === 0 ? 1 : prettyRound(generateItemBasePrice(index - 1))
    // console.log({
    //   index: index + 1,
    //   name: item.name,
    //   prices: { price, rawPrice },
    //   incomes: { income, rawIncome },
    //   ratio: (income / price) * 100 + '%',
    //   jump: (price / prevPrice).toFixed(1) + 'x',
    // })
  })

  return items
}

export const shopItems: ShopItems = generateItems()

export function getTier(item: Item, extraAmount = 0) {
  if (item.amount + extraAmount < 10) return 0
  if (item.amount + extraAmount < 25) return 1
  if (item.amount + extraAmount < 50) return 2
  return 2 + Math.floor((item.amount + extraAmount) / 50)
}

export function getTotalTiers(items: ShopItems) {
  return Object.values(items).reduce((acc, item) => acc + getTier(item), 0)
}

export function getIncome(item: Item, multiplier = 1) {
  return multiplier * item.income * item.amount * 2 ** getTier(item)
}

export function getIncomePerAmount(item: Item, amount = 1, multiplier = 1) {
  const currentTier = getTier(item)
  const nextTier = getTier(item, amount)
  const currentIncome = item.income * item.amount * 2 ** currentTier
  const nextIncome = item.income * (item.amount + amount) * 2 ** nextTier
  return (nextIncome - currentIncome) * multiplier
}

export function getAmountAndProgress(item: Item) {
  if (item.amount < 1) return { current: 0, next: 1 }
  if (item.amount < 10) return { current: item.amount, next: 10 }
  if (item.amount < 25) return { current: item.amount, next: 25 }
  if (item.amount < 50) return { current: item.amount, next: 50 }

  return {
    current: item.amount,
    next: item.amount - (item.amount % 50) + 50,
  }
}
