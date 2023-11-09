import { Item, ShopItems } from '@/features/clicker/clickerTypes'
// price formula: (1 + index/10)**2 * (10 ** index)
// income formula: price * 0.01 / (1.5 ** (index-1))

// i=1: price = 1.21 * 10 = 12.1 ~~ 10
// ---- income = 10 * 0.01 / 1 = 0.1 ~~ 0.1
// ---- ratio = 0.1 / 10 = 1%

// i=2: price = 1.44 * 100 = 144 ~~ 150
// ---- income = 150 * 0.01 / 1.5 = 1 ~~ 1
// ---- ratio = 1 / 150 = 0.67%

// i=3: price = 1.69 * 1000 = 1_690 ~~ 1_700,
// ---- income = 1_700 * 0.01 / 2.25 = 7.56~~ 8
// ---- ratio = 8 / 1_700 = 0.47%

// i=4: price = 1.96 * 10_000 = 19_600 ~~ 20_000,
// ---- income = 20_000 * 0.01 / 3.375 = 59.26 ~~ 60
// ---- ratio = 60 / 20_000 = 0.3%

// i=5: price = 2.25 * 100_000 = 225_000 ~~ 225_000,
// ---- income = 225_000 * 0.01 / 5.0625 = 445.31 ~~ 450
// ---- ratio = 450 / 225_000 = 0.2%

// i=6: price = 2.56 * 1_000_000 = 2_560_000 ~~ 2_500_000,
// ---- income = 2_500_000 * 0.01 / 7.59375 = 3_289.06 ~~ 3_300
// ---- ratio = 3_300 / 2_500_000 = 0.13%

// i=7: price = 2.89 * 10_000_000 = 28_900_000 ~~ 30_000_000,
// ---- income = 30_000_000 * 0.01 / 11.39 = 26_384 ~~ 26_500
// ---- ratio = 26_500 / 30_000_000 = 0.09%

// i=8: price = 3.24 * 100_000_000 = 324_000_000 ~~ 325_000_000,
// ---- income = 325_000_000 * 0.01 / 17.086 = 190_214 ~~ 190_000
// ---- ratio = 190_000 / 325_000_000 = 0.06%

// i=9: price = 3.61 * 1_000_000_000 = 3_610_000_000 ~~ 3_500_000_000,
// ---- income = 3_500_000_000 * 0.01 / 25.629 = 1_366_120 ~~ 1_400_000
// ---- ratio = 1_400_000 / 3_500_000_000 = 0.04%

// i=10: price = 4 * 10_000_000_000 = 40_000_000_000 ~~ 40_000_000_000,
// ---- income = 40_000_000_000 * 0.01 / 38.443 = 10_404_000 ~~ 10_500_000
// ---- ratio = 10_500_000 / 40_000_000_000 = 0.03%

// i=11: price = 4.41 * 100_000_000_000 = 441_000_000_000 ~~ 450_000_000_000,
// ---- income = 450_000_000_000 * 0.01 / 57.665 = 78_036_937 ~~ 80_000_000
// ---- ratio = 80_000_000 / 450_000_000_000 = 0.02%

// i=12: price = 4.84 * 1_000_000_000_000 = 4_840_000_000_000 ~~ 5_000_000_000_000,
// ---- income = 5_000_000_000_000 * 0.01 / 86.497 = 577_960_000 ~~ 600_000_000
// ---- ratio = 600_000_000 / 5_000_000_000_000 = 0.01%

// i=13: price = 5.29 * 10_000_000_000_000 = 52_900_000_000_000 ~~ 55_000_000_000_000,
// ---- income = 55_000_000_000_000 * 0.01 / 129.745 = 4_238_340_000 ~~ 4_300_000_000
// ---- ratio = 4_300_000_000 / 55_000_000_000_000 = 0.008%

export const shopItems: ShopItems = {
  // 1
  volunteer: {
    id: 'volunteer',
    name: 'Volunteer',
    price: 10,
    description: 'Lorem Ipsum',
    income: 0.1,
    amount: 0,
    priceMultiplier: 1.1,
  },
  trainee: {
    // 2
    id: 'trainee',
    name: 'Trainee',
    price: 100,
    description: 'Lorem Ipsum',
    income: 1,
    amount: 0,
    priceMultiplier: 1.11,
  },
  juniorDev: {
    // 3
    id: 'juniorDev',
    name: 'Junior Developer',
    price: 1_200,
    description: 'Lorem Ipsum',
    income: 10,
    amount: 0,
    priceMultiplier: 1.12,
  },
  midDev: {
    // 4
    id: 'midDev',
    name: 'Mid-level Developer',
    price: 12_500,
    description: 'Lorem Ipsum',
    income: 50,
    amount: 0,
    priceMultiplier: 1.13,
  },
  seniorDev: {
    // 5
    id: 'seniorDev',
    name: 'Senior Developer',
    price: 120_000,
    description: 'Lorem Ipsum',
    income: 250,
    amount: 0,
    priceMultiplier: 1.14,
  },
  techLeader: {
    // 6
    id: 'techLeader',
    name: 'Tech Leader',
    price: 1_500_000,
    description: 'Lorem Ipsum',
    income: 1_500,
    amount: 0,
    priceMultiplier: 1.15,
  },
  startup: {
    // 7
    id: 'startup',
    name: 'Startup',
    price: 20_000_000,
    description: 'Lorem Ipsum',
    income: 8_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  smallCompany: {
    // 8
    id: 'smallCompany',
    name: 'Small Company',
    price: 350_000_000,
    description: 'Lorem Ipsum',
    income: 50_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  mediumCompany: {
    // 9
    id: 'mediumCompany',
    name: 'Medium Company',
    price: 4_500_000_000,
    description: 'Lorem Ipsum',
    income: 220_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  bigCompany: {
    // 10
    id: 'bigCompany',
    name: 'Big Company',
    price: 70_000_000_000,
    description: 'Lorem Ipsum',
    income: 1_500_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  corporation: {
    // 11
    id: 'corporation',
    name: 'Corporation',
    price: 1_000_000_000_000,
    description: 'Lorem Ipsum',
    income: 10_000_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  bank: {
    // 12
    id: 'bank',
    name: 'Bank',
    price: 15_000_000_000_000,
    description: 'Lorem Ipsum',
    income: 80_000_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  interBank: {
    // 13
    id: 'interBank',
    name: 'International Bank',
    price: 200_000_000_000_000,
    description: 'Lorem Ipsum',
    income: 500_000_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
}

export function getTier(item: Item) {
  if (item.amount < 10) return 0
  if (item.amount < 25) return 1
  if (item.amount < 50) return 2
  return 2 + Math.floor(item.amount / 50)
}

export function getIncome(item: Item) {
  return item.income * item.amount * 2 ** getTier(item)
}

export function getSingleIncome(item: Item) {
  return item.income * 2 ** getTier(item)
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
