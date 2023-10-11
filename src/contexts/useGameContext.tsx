import { Buyable } from '@/data/buyable'
import { Item, ShopItems, shopItems } from '@/data/items'
import { ShopUpgrades, Upgrade, shopUgrades } from '@/data/upgrades'
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
  items: ShopItems
  upgrades: ShopUpgrades
  buy: (buyable: Buyable) => void
  getAdjustedPrice: (buyable: Buyable) => number
  totalCoins: number
  passiveIncome: number
  hoverIncome: number
  clicksIncome: number
  clickCoin: () => void
  setMouseOrTouchOnCoin: React.Dispatch<React.SetStateAction<boolean>>
  mouseOrTouchOnCoin: boolean
}

type Coins = {
  fromClicks: number
  fromHover: number
  fromIncome: number
  spent: number
}

export const GameContext = createContext<GameContextProps>({
  items: {},
  upgrades: {},
  buy: () => null,
  getAdjustedPrice: () => 0,
  totalCoins: 0,
  passiveIncome: 0,
  hoverIncome: 0,
  clicksIncome: 0,
  clickCoin: () => null,
  setMouseOrTouchOnCoin: () => null,
  mouseOrTouchOnCoin: false,
})

const gameFPS = 30

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<ShopItems>(shopItems)
  const [upgrades, setUpgrades] = useState<ShopUpgrades>(shopUgrades)
  const [clicksIncome, setClicksIncome] = useState(0)
  const [mouseOrTouchOnCoin, setMouseOrTouchOnCoin] = useState(false)
  const [frameSwitch, setFrameSwitch] = useState(false)
  const [lastClickTime, setLastClickTime] = useState(performance.now())
  const [lastFrameTime, setLastFrameTime] = useState(performance.now())
  const [lastClickUpdate, setLastClickUpdate] = useState(performance.now())
  const [last5Clicks, setLast5Clicks] = useState<number[]>([0, 0, 0, 0, 0])
  const [coins, updateCoins] = useReducer(
    (prev: Coins, next: Partial<Coins>) => {
      return { ...prev, ...next }
    },
    {
      fromClicks: 0,
      fromHover: 0,
      fromIncome: 0,
      spent: 0,
    },
  )

  const coinsPerClick: number = useMemo(() => {
    const coinValue = Math.pow(
      upgrades.clickMultiplier.multiplier,
      upgrades.clickMultiplier.amount,
    )
    return coinValue
  }, [upgrades])

  const totalCoins = Math.round(
    coins.fromClicks + coins.fromIncome + coins.fromHover - coins.spent,
  )

  const getAdjustedPrice = useCallback(
    (buyable: Buyable) => {
      return Math.round(
        buyable.price * Math.pow(buyable.priceMultiplier, buyable.amount),
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, upgrades],
  )

  const buy = useCallback(
    (buyable: Buyable) => {
      const price = getAdjustedPrice(buyable)
      if (totalCoins < price) {
        return
      }
      if ('income' in buyable) {
        updateCoins({ spent: coins.spent + price })
        const newItems = { ...items }
        newItems[buyable.id].amount += 1
        setItems(newItems)
      }
      if ('multiplier' in buyable) {
        updateCoins({ spent: coins.spent + price })
        const newUpgrades = { ...upgrades }
        newUpgrades[buyable.id].amount += 1
        setUpgrades(newUpgrades)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, coins],
  )

  const passiveIncome = useMemo(() => {
    return Object.values(items).reduce((total, item: Item) => {
      return total + item.income * item.amount
    }, 0)
  }, [items])

  function updateIncome() {
    const currentTime = performance.now()
    const clicksCoins = estimateClicksIncome(currentTime)
    setClicksIncome(clicksCoins)
    setLastFrameTime(currentTime)

    const elapsedTime = currentTime - lastFrameTime
    const incomeCoins = calculateIncomeCoins(elapsedTime)
    const hoverCoins = calculateHoverCoins(elapsedTime)
    updateCoins({
      fromIncome: coins.fromIncome + incomeCoins,
      fromHover: coins.fromHover + hoverCoins,
    })

    setFrameSwitch(!frameSwitch)
  }

  function calculateIncomeCoins(elapsedTime: number) {
    return (passiveIncome * elapsedTime) / 1000
  }

  function calculateHoverCoins(elapsedTime: number) {
    const coinsToAdd =
      upgrades.hoverClicker.amount *
      upgrades.hoverClicker.multiplier *
      coinsPerClick
    return mouseOrTouchOnCoin ? (elapsedTime * coinsToAdd) / 1000 : 0
  }

  function estimateClicksIncome(currentTime: number) {
    // only update every 1000ms
    if (last5Clicks[0] === 0) return 0
    if (currentTime - lastClickTime > 3000) {
      setLast5Clicks([0, 0, 0, 0, 0])
      return 0
    }
    if (currentTime - lastClickUpdate < 1000) return clicksIncome

    const totalClickTime = last5Clicks.reduce((total, time) => total + time, 0)
    const timeSinceLastClick = currentTime - lastClickTime
    const averageClickTime = (totalClickTime + timeSinceLastClick) / 6
    const estimative = (1000 / averageClickTime) * coinsPerClick

    setLastClickUpdate(currentTime)
    return Math.round(estimative)
  }

  const clickCoin = useCallback(() => {
    const currentTime = performance.now()
    const elapsedTime = currentTime - lastClickTime
    const next5Clicks = [...last5Clicks]
    next5Clicks.shift()
    next5Clicks.push(elapsedTime)
    setLast5Clicks(next5Clicks)
    setLastClickTime(currentTime)
    updateCoins({ fromClicks: coins.fromClicks + coinsPerClick })
  }, [coins])

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      requestAnimationFrame(updateIncome)
    }, 1000 / gameFPS)
    return () => {
      clearTimeout(timeOutID)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameSwitch])

  const displayIncome = Math.round(passiveIncome * 100) / 100

  const hoverIncome = useMemo(() => {
    return mouseOrTouchOnCoin
      ? Math.round(
          coinsPerClick *
            upgrades.hoverClicker.amount *
            upgrades.hoverClicker.multiplier *
            100,
        ) / 100
      : 0
  }, [coinsPerClick, mouseOrTouchOnCoin, upgrades.hoverClicker.amount])

  const contextValues = useMemo(
    () => ({
      items,
      upgrades,
      passiveIncome: displayIncome,
      hoverIncome,
      clicksIncome,
      buy,
      getAdjustedPrice,
      totalCoins,
      clickCoin,
      mouseOrTouchOnCoin,
      setMouseOrTouchOnCoin,
    }),
    [
      items,
      upgrades,
      displayIncome,
      hoverIncome,
      clicksIncome,
      buy,
      getAdjustedPrice,
      totalCoins,
      clickCoin,
      mouseOrTouchOnCoin,
      setMouseOrTouchOnCoin,
    ],
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
