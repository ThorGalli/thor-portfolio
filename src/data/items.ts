import { Buyable } from './buyable'

export type Item = {
  income: number
} & Buyable

export type ShopItems = {
  [key: string]: Item
}

export const shopItems: ShopItems = {
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
    id: 'trainee',
    name: 'Trainee',
    price: 100,
    description: 'Lorem Ipsum',
    income: 1,
    amount: 0,
    priceMultiplier: 1.11,
  },
  juniorDev: {
    id: 'juniorDev',
    name: 'Junior Developer',
    price: 1_200,
    description: 'Lorem Ipsum',
    income: 10,
    amount: 0,
    priceMultiplier: 1.12,
  },
  midDev: {
    id: 'midDev',
    name: 'Mid-level Developer',
    price: 12_500,
    description: 'Lorem Ipsum',
    income: 50,
    amount: 0,
    priceMultiplier: 1.13,
  },
  seniorDev: {
    id: 'seniorDev',
    name: 'Senior Developer',
    price: 120_000,
    description: 'Lorem Ipsum',
    income: 250,
    amount: 0,
    priceMultiplier: 1.14,
  },
  techLeader: {
    id: 'techLeader',
    name: 'Tech Leader',
    price: 1_500_000,
    description: 'Lorem Ipsum',
    income: 1_500,
    amount: 0,
    priceMultiplier: 1.15,
  },
  startup: {
    id: 'startup',
    name: 'Startup',
    price: 20_000_000,
    description: 'Lorem Ipsum',
    income: 8_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  smallCompany: {
    id: 'smallCompany',
    name: 'Small Company',
    price: 350_000_000,
    description: 'Lorem Ipsum',
    income: 50_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  mediumCompany: {
    id: 'mediumCompany',
    name: 'Medium Company',
    price: 4_500_000_000,
    description: 'Lorem Ipsum',
    income: 220_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  bigCompany: {
    id: 'bigCompany',
    name: 'Big Company',
    price: 70_000_000_000,
    description: 'Lorem Ipsum',
    income: 1_500_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  corporation: {
    id: 'corporation',
    name: 'Corporation',
    price: 1_000_000_000_000,
    description: 'Lorem Ipsum',
    income: 10_000_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
  bank: {
    id: 'bank',
    name: 'Bank',
    price: 15_000_000_000_000,
    description: 'Lorem Ipsum',
    income: 80_000_000,
    amount: 0,
    priceMultiplier: 1.15,
  },
}
