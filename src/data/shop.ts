export type Item = {
  id: number
  name: string
  price: number
  description: string
  income: number
  amount: number
}

export const defaultShop: Item[] = [
  {
    id: 0,
    name: 'Lemonade Stand',
    price: 5,
    description: 'A small lemonade stand.',
    income: 1,
    amount: 0,
  },
  {
    id: 1,
    name: 'Newspaper Delivery',
    price: 100,
    description: 'A small newspaper delivery service.',
    income: 20,
    amount: 0,
  },
  {
    id: 2,
    name: 'Car Wash',
    price: 2000,
    description: 'A small car wash.',
    income: 400,
    amount: 0,
  },
]
