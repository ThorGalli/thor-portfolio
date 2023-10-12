import { Buyable } from '@/data/buyable'
import { Item, ShopItems, shopItems } from '@/data/items'
import { ShopUpgrades, shopUgrades } from '@/data/upgrades'
import { parseCookies, setCookie } from 'nookies'
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
  loading: boolean
  lastSaveTime: number
  items: ShopItems
  upgrades: ShopUpgrades
  buy: (buyable: Buyable) => void
  getAdjustedPrice: (buyable: Buyable) => number
  totalCoins: number
  resourceIncome: number
  autoIncome: number
  clicksIncome: number
  clickCoin: () => void
  saveGame: () => void
  loadGame: () => void
  deleteGameCookie: () => void
}

type Coins = {
  fromClicks: number
  fromAuto: number
  fromResources: number
  spent: number
}

export const GameContext = createContext<GameContextProps>({
  loading: true,
  lastSaveTime: 0,
  items: {},
  upgrades: {},
  buy: () => null,
  getAdjustedPrice: () => 0,
  totalCoins: 0,
  resourceIncome: 0,
  autoIncome: 0,
  clicksIncome: 0,
  clickCoin: () => null,
  saveGame: () => null,
  loadGame: () => null,
  deleteGameCookie: () => null,
})

const copy = (obj: any) => JSON.parse(JSON.stringify(obj))
const cleanGame = {
  items: copy(shopItems),
  upgrades: copy(shopUgrades),
  coins: {
    fromClicks: 0,
    fromAuto: 0,
    fromResources: 0,
    spent: 0,
  },
}
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<ShopItems>(copy(shopItems))
  const [upgrades, setUpgrades] = useState<ShopUpgrades>(copy(shopUgrades))
  const [clicksIncome, setClicksIncome] = useState(0)
  const [frameSwitch, setFrameSwitch] = useState(false)
  const [lastClickTime, setLastClickTime] = useState(performance.now())
  const [lastFrameTime, setLastFrameTime] = useState(performance.now())
  const [lastClickUpdate, setLastClickUpdate] = useState(performance.now())
  const [lastSaveTime, setLastSaveTime] = useState(performance.now())
  const [last5Clicks, setLast5Clicks] = useState<number[]>([0, 0, 0, 0, 0])
  const [offlineTime, setOfflineTime] = useState(0)
  const [resetGame, setResetGame] = useState({
    shouldReset: false,
    timeOffline: 0,
    ...cleanGame,
  })
  const [coins, updateCoins] = useReducer(
    (prev: Coins, next: Partial<Coins>) => {
      return { ...prev, ...next }
    },
    {
      fromClicks: 0,
      fromAuto: 0,
      fromResources: 0,
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
    coins.fromClicks + coins.fromResources + coins.fromAuto - coins.spent,
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

  const resourceIncome = useMemo(() => {
    return Object.values(items).reduce((total, item: Item) => {
      return total + item.income * item.amount
    }, 0)
  }, [items])

  function updateIncome(currentTime: number) {
    const clicksCoins = estimateClicksIncome(currentTime)
    const elapsedTime = currentTime - lastFrameTime + offlineTime
    let resourceCoins = calculateResourceIncome(elapsedTime)
    let autoCoins = calculateAutoCoins(elapsedTime)
    if (offlineTime > 0) {
      const { offlineResourceCoins, offlineAutoCoins } =
        calculateOfflineIncome(offlineTime)
      resourceCoins += offlineResourceCoins
      autoCoins += offlineAutoCoins
      setOfflineTime(0)
    }
    updateCoins({
      fromResources: coins.fromResources + resourceCoins,
      fromAuto: coins.fromAuto + autoCoins,
    })
    setClicksIncome(clicksCoins)
    setLastFrameTime(currentTime)
  }

  function updateDataFromLoad() {
    setItems(copy(resetGame.items))
    setUpgrades(copy(resetGame.upgrades))
    setOfflineTime(resetGame.timeOffline)

    const { fromClicks, fromResources, fromAuto, spent } = copy(resetGame.coins)

    updateCoins({
      fromClicks,
      fromResources,
      fromAuto,
      spent,
    })

    setResetGame({ ...resetGame, shouldReset: false })
    setTimeout(() => {
      setFrameSwitch(!frameSwitch)
    }, 100)
  }

  function update() {
    if (resetGame.shouldReset) {
      updateDataFromLoad()
      return
    }
    const currentTime = performance.now()
    updateIncome(currentTime)
    checkForSave(currentTime)
    setFrameSwitch(!frameSwitch)
  }

  function calculateOfflineIncome(offlineTime: number) {
    const offlineResourceCoins = calculateResourceIncome(offlineTime)
    const offlineAutoCoins = calculateAutoCoins(offlineTime)
    return { offlineResourceCoins, offlineAutoCoins }
  }

  function calculateResourceIncome(elapsedTime: number) {
    return (resourceIncome * elapsedTime) / 1000
  }

  function calculateAutoCoins(elapsedTime: number) {
    const coinsToAdd =
      upgrades.autoClicker.amount *
      upgrades.autoClicker.multiplier *
      coinsPerClick
    return (elapsedTime * coinsToAdd) / 1000 || 0
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
    if (loading) return
    requestAnimationFrame(update)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameSwitch, loading])

  function checkForSave(currentTime: number) {
    if (currentTime - lastSaveTime > 1000 * 60 * 5) {
      setLastSaveTime(currentTime)
      saveGame()
    }
  }

  const saveGame = useCallback(() => {
    const currentDateTimeInMS = new Date().getTime()
    const currentRunTime = performance.now()
    const saveData = {
      items,
      upgrades,
      coins,
      saveTime: currentDateTimeInMS,
    }
    setCookie(null, 'thor-cookie-saveData', JSON.stringify(saveData), {
      maxAge: 12 * 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Strict',
    })
    setLastSaveTime(currentRunTime)
  }, [items, upgrades, coins])

  const deleteGameCookie = useCallback(() => {
    setLoading(true)
    setCookie(null, 'thor-cookie-saveData', '', {
      maxAge: 0,
      path: '/',
      sameSite: 'Strict',
    })

    setItems(copy(shopItems))
    setUpgrades(copy(shopUgrades))

    setResetGame({
      shouldReset: true,
      timeOffline: 0,
      ...cleanGame,
    })

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    loadGame()
  }, [])

  const loadGame = useCallback(() => {
    setLoading(true)
    try {
      const cookies = parseCookies(null)
      const saveData = cookies['thor-cookie-saveData']
      if (!saveData) {
        setLoading(false)
        return
      }
      const parsedData = JSON.parse(saveData)
      const { items, upgrades, coins, saveTime } = parsedData
      if (!items || !upgrades || !coins || !saveTime) {
        setLoading(false)
        return
      }
      const timeOffline = new Date().getTime() - saveTime
      setResetGame({
        shouldReset: true,
        items,
        upgrades,
        coins,
        timeOffline,
      })
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const displayIncome = Math.round(resourceIncome * 100) / 100

  const autoIncome = useMemo(() => {
    return (
      Math.round(
        coinsPerClick *
          upgrades.autoClicker.amount *
          upgrades.autoClicker.multiplier *
          100,
      ) / 100
    )
  }, [coinsPerClick, upgrades.autoClicker.amount])

  const contextValues = useMemo(
    () => ({
      loading,
      lastSaveTime,
      items,
      upgrades,
      resourceIncome: displayIncome,
      autoIncome,
      clicksIncome,
      buy,
      getAdjustedPrice,
      totalCoins,
      clickCoin,
      saveGame,
      loadGame,
      deleteGameCookie,
    }),
    [
      loading,
      lastSaveTime,
      items,
      upgrades,
      displayIncome,
      autoIncome,
      clicksIncome,
      buy,
      getAdjustedPrice,
      totalCoins,
      clickCoin,
      saveGame,
      loadGame,
      deleteGameCookie,
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
