import { Item, ShopItems } from '@/features/clicker/clickerTypes'

const baseItems = [
  { id: 'volunteer', name: 'Volunteer' },
  { id: 'trainee', name: 'Trainee' },
  { id: 'juniorDev', name: 'Junior Developer' },
  { id: 'midDev', name: 'Mid-level Developer' },
  { id: 'seniorDev', name: 'Senior Developer' },

  { id: 'techLeader', name: 'Tech Leader' },
  { id: 'startup', name: 'Startup' },
  { id: 'smallCompany', name: 'Small Company' },
  { id: 'mediumCompany', name: 'Medium Company' },
  { id: 'bigCompany', name: 'Big Company' },

  { id: 'corporation', name: 'Corporation' },
  { id: 'techUnicorn', name: 'Tech Unicorn' },
  { id: 'bank', name: 'National Bank' },
  { id: 'investBank', name: 'Investment Bank' },
  { id: 'interBank', name: 'International Bank' },

  { id: 'ventureCapital', name: 'Global Conglomerate' },
  { id: 'terraformingcorp', name: 'Terraforming Corp' },
  { id: 'spaceTravelCorp', name: 'Space Travel Corp' },
  { id: 'spaceMiningCorp', name: 'Space Mining Corp' },
  { id: 'interGalacticBank', name: 'Inter-Planetary Bank' },
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

    const newItem = {
      id: item.id,
      name: item.name,
      price,
      description: 'Lorem Ipsum',
      income,
      amount: 0,
      priceMultiplier: Math.min(1.15, 1.1 + index / 100),
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

export function getTier(item: Item) {
  if (item.amount < 10) return 0
  if (item.amount < 25) return 1
  if (item.amount < 50) return 2
  return 2 + Math.floor(item.amount / 50)
}

export function getIncome(item: Item) {
  return item.income * item.amount * 2 ** getTier(item)
}

export function getIncomePerAmount(item: Item, amount = 1) {
  return amount * item.income * 2 ** getTier(item)
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
