import {
  getInitialGame,
  getInitialControl,
  copy,
} from '@/features/clicker/data/initialValues'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import useClickerProgress from '@/features/clicker/hooks/useClickerProgress'
import {
  ClickerContextProps,
  Coins,
  Item,
  LoopControl,
  ClickerState,
  Upgrade,
  ShopItems,
  ShopUpgrades,
} from '@/types'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

export const ClickerContext = createContext<ClickerContextProps>({
  items: {},
  upgrades: {},
  buy: () => null,
  getAdjustedPrice: () => 0,
  totalCoins: 0,
  resourceIncome: 0,
  autoIncome: 0,
  clicksIncome: 0,
  onClickCoin: () => null,
  onSave: () => null,
  loading: true,
  lastSaveTime: 0,
  deleteGameData: () => null,
})

const BASE_COIN_VALUE = 1
const GAME_FPS = 30
const FRAME_TIME = 1000 / GAME_FPS

export const ClickerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // Custom utility hooks
  const {
    getAdjustedPrice,
    calculateOfflineIncome,
    calculateResourceIncome,
    calculateAutoCoins,
    estimateClicksIncome,
  } = useClickerCalculations()

  const {
    loading,
    loadGameData,
    saveGameData,
    deleteGameData,
    setCacheGameData,
    cacheGameData,
    lastSaveTime,
  } = useClickerProgress()

  // Loop Control state variables
  const [loopControl, setLoopControl] = useReducer(
    (prev: LoopControl, next: Partial<LoopControl>) => {
      return { ...prev, ...next }
    },
    getInitialControl(),
  )

  // This variable switches between true and false every frame to trigger a re-render
  const [frameSwitch, setFrameSwitch] = useState(false)

  // Game state variables
  const [gameState, setGameState] = useReducer(
    (
      prev: ClickerState,
      next: {
        items?: ShopItems
        upgrades?: ShopUpgrades
        coins?: Partial<Coins>
        offlineTime?: number
      },
    ) => {
      const { coins: prevcoins } = prev
      const { coins } = next
      return {
        ...prev,
        ...next,
        coins: { ...prevcoins, ...coins },
      }
    },
    getInitialGame(),
  )

  const coinsPerClick: number = useMemo(() => {
    const clickMultiplier = Math.pow(
      gameState.upgrades.clickMultiplier.multiplier,
      gameState.upgrades.clickMultiplier.amount,
    )

    const coinValue = BASE_COIN_VALUE * clickMultiplier
    return coinValue
  }, [gameState.upgrades])

  const totalCoins = Math.round(
    gameState.coins.fromClicks +
      gameState.coins.fromResources +
      gameState.coins.fromAuto -
      gameState.coins.spent,
  )

  const resourceIncome = useMemo(() => {
    return Object.values(gameState.items).reduce((total, item: Item) => {
      return total + item.income * item.amount
    }, 0)
  }, [gameState.items])

  const buy = useCallback(
    (buyable: Item | Upgrade) => {
      const price = getAdjustedPrice(buyable)
      if (totalCoins < price) {
        return
      }
      if ('income' in buyable) {
        const newItems = { ...gameState.items }
        newItems[buyable.id].amount += 1
        setGameState({
          items: newItems,
          coins: { spent: gameState.coins.spent + price },
        })
      }
      if ('multiplier' in buyable) {
        const newUpgrades = { ...gameState.upgrades }
        newUpgrades[buyable.id].amount += 1
        setGameState({
          upgrades: newUpgrades,
          coins: { spent: gameState.coins.spent + price },
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameState.items, gameState.coins],
  )

  function update() {
    if (cacheGameData.shouldReset) {
      updateDataFromLoad()
      return
    }
    const currentTime = performance.now()
    updateIncome(currentTime)
    checkForSave(currentTime)
    const frameDuration = currentTime - loopControl.lastFrameTime
    const awaitTime =
      FRAME_TIME > frameDuration ? FRAME_TIME - frameDuration : 0

    setTimeout(() => {
      setFrameSwitch(!frameSwitch)
    }, awaitTime)
  }

  function updateIncome(currentTime: number) {
    const elapsedTime =
      currentTime - loopControl.lastFrameTime + gameState.offlineTime
    let resourceCoins = calculateResourceIncome(elapsedTime, resourceIncome)
    let autoCoins = calculateAutoCoins(elapsedTime, autoIncome)
    if (gameState.offlineTime > 0) {
      const { offlineResourceCoins, offlineAutoCoins } = calculateOfflineIncome(
        gameState.offlineTime,
        resourceIncome,
        autoIncome,
      )
      resourceCoins += offlineResourceCoins
      autoCoins += offlineAutoCoins
      setGameState({
        offlineTime: 0,
      })
    }
    setGameState({
      coins: {
        fromResources: gameState.coins.fromResources + resourceCoins,
        fromAuto: gameState.coins.fromAuto + autoCoins,
      },
    })
    const coinsFromClicks = estimateClicksIncome(
      loopControl,
      setLoopControl,
      currentTime,
      coinsPerClick,
    )
    setLoopControl({
      estimatedClicksIncome: coinsFromClicks,
      lastFrameTime: currentTime,
    })
  }

  function updateDataFromLoad() {
    const { fromClicks, fromResources, fromAuto, spent } = copy(
      cacheGameData.coins,
    )
    const newItems = getInitialGame().items
    const newUpgrades = getInitialGame().upgrades
    Object.entries(cacheGameData.items).forEach(([key, value]) => {
      newItems[key].amount = value.amount
    })
    Object.entries(cacheGameData.upgrades).forEach(([key, value]) => {
      newUpgrades[key].amount = value.amount
    })
    setGameState({
      items: newItems,
      upgrades: newUpgrades,
      offlineTime: cacheGameData.offlineTime,
      coins: {
        fromClicks,
        fromResources,
        fromAuto,
        spent,
      },
    })
    setCacheGameData({ ...cacheGameData, shouldReset: false })
    setTimeout(() => {
      setFrameSwitch(!frameSwitch)
    }, 100)
  }

  const onClickCoin = useCallback(() => {
    const currentTime = performance.now()
    const elapsedTime = currentTime - loopControl.lastClickTime
    const next5Clicks = [...loopControl.last5Clicks]
    next5Clicks.shift()
    next5Clicks.push(elapsedTime)
    setLoopControl({ lastClickTime: currentTime, last5Clicks: next5Clicks })
    setGameState({
      coins: { fromClicks: gameState.coins.fromClicks + coinsPerClick },
    })
  }, [gameState.coins])

  const onSave = useCallback(() => {
    saveGameData(gameState)
  }, [gameState])

  function checkForSave(currentTime: number) {
    if (currentTime - lastSaveTime > 1000 * 60 * 5) {
      saveGameData(gameState)
    }
  }

  useEffect(() => {
    if (loading) return
    requestAnimationFrame(update)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameSwitch, loading])

  useEffect(() => {
    loadGameData()
  }, [])

  // Variables for Display
  //
  //
  // ====================================================================
  const autoIncome = useMemo(() => {
    // Auto Clicker base income
    const autoClickerCoins =
      gameState.upgrades.autoClicker.amount *
      gameState.upgrades.autoClicker.multiplier *
      coinsPerClick

    // Volunteer Clicker income multiplier
    const volunteerMultiplier =
      1 +
      gameState.items.volunteer.amount * // 100
        gameState.upgrades.volunteerClicking.multiplier * // 0.001
        gameState.upgrades.volunteerClicking.amount // 1

    return autoClickerCoins * volunteerMultiplier
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinsPerClick, gameState.upgrades, gameState.items])

  const displayClicksIncome = useMemo(() => {
    return loopControl.estimatedClicksIncome
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopControl.estimatedClicksIncome])

  const displayResourceIncome = useMemo(() => {
    return Math.round(resourceIncome * 100) / 100
  }, [resourceIncome])

  const displayAutoIncome = useMemo(() => {
    return Math.round(autoIncome * 100) / 100
  }, [autoIncome])
  // ====================================================================

  const contextValues = useMemo(
    () => ({
      clicksIncome: displayClicksIncome,
      items: gameState.items,
      upgrades: gameState.upgrades,
      resourceIncome: displayResourceIncome,
      autoIncome: displayAutoIncome,
      totalCoins,
      buy,
      getAdjustedPrice,
      onClickCoin,
      onSave,
      loading,
      lastSaveTime,
      deleteGameData,
    }),
    [
      displayClicksIncome,
      gameState.items,
      gameState.upgrades,
      displayResourceIncome,
      displayAutoIncome,
      totalCoins,
      buy,
      getAdjustedPrice,
      onClickCoin,
      onSave,
      loading,
      lastSaveTime,
      deleteGameData,
    ],
  )

  return (
    <ClickerContext.Provider value={contextValues}>
      {children}
    </ClickerContext.Provider>
  )
}

export function useClickerContext() {
  return useContext(ClickerContext)
}
