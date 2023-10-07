import { Item, defaultShop } from '@/data/shop'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

type GameContextProps = {
  items: Item[]
  buyItem: (item: Item) => void
  getAdjustedItemPrice: (item: Item) => number
  totalCoins: number
  baseIncome: number
  clickCoin: () => void
}

type Coins = {
  clickedCoins: number
  spentCoins: number
  incomeCoins: number
}

export const GameContext = createContext<GameContextProps>({
  items: [],
  buyItem: () => null,
  getAdjustedItemPrice: () => 0,
  totalCoins: 0,
  baseIncome: 0,
  clickCoin: () => null,
})

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>(defaultShop)

  const [coins, updateCoins] = useReducer(
    (prev: Coins, next: Partial<Coins>) => {
      return { ...prev, ...next }
    },
    {
      clickedCoins: 0,
      spentCoins: 0,
      incomeCoins: 0,
    },
  )

  const totalCoins = coins.clickedCoins + coins.incomeCoins - coins.spentCoins

  const getAdjustedItemPrice = useCallback(
    (item: Item) => {
      return Math.round(item.price * Math.pow(1.15, item.amount))
    },
    [items],
  )
  const buyItem = useCallback(
    (item: Item) => {
      const price = getAdjustedItemPrice(item)
      if (totalCoins >= price) {
        updateCoins({ spentCoins: coins.spentCoins + price })
        const index = items.findIndex((i) => i.name === item.name)
        const newItems = [...items]
        newItems[index].amount += 1
        setItems(newItems)
      }
    },
    [items, coins],
  )

  const baseIncome = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.income * item.amount
    }, 0)
  }, [items])

  const clickCoin = useCallback(() => {
    updateCoins({ clickedCoins: coins.clickedCoins + 1 })
  }, [coins])

  useEffect(() => {
    const interval = setInterval(() => {
      updateCoins({ incomeCoins: coins.incomeCoins + baseIncome })
    }, 1000)
    return () => clearInterval(interval)
  }, [coins.incomeCoins, baseIncome])

  const contextValues = useMemo(
    () => ({
      items,
      baseIncome,
      buyItem,
      getAdjustedItemPrice,
      totalCoins,
      clickCoin,
    }),
    [items, buyItem, baseIncome, getAdjustedItemPrice, totalCoins, clickCoin],
  )

  return (
    <GameContext.Provider value={contextValues}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  return useContext(GameContext)
}
