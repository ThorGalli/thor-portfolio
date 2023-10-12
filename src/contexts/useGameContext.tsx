import { getInitialGame, getInitialControl, copy } from '@/data/initialValues'
import {
  GameContextProps,
  Coins,
  Item,
  LoopControl,
  GameState,
  Upgrade,
  ShopItems,
  ShopUpgrades,
} from '@/types'
import useMathUtils from '@/utils/useMathUtils'
import useGameData from '@/utils/useGameData'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

export const GameContext = createContext<GameContextProps>({
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

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Custom utility hooks
  const {
    getAdjustedPrice,
    calculateOfflineIncome,
    calculateResourceIncome,
    calculateAutoCoins,
    estimateClicksIncome,
  } = useMathUtils()

  const {
    loading,
    loadGameData,
    saveGameData,
    deleteGameData,
    setCacheGameData,
    cacheGameData,
    lastSaveTime,
  } = useGameData()

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
      prev: GameState,
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
    const coinValue =
      BASE_COIN_VALUE *
      Math.pow(
        gameState.upgrades.clickMultiplier.multiplier,
        gameState.upgrades.clickMultiplier.amount,
      )
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
    let autoCoins = calculateAutoCoins(
      elapsedTime,
      gameState.upgrades,
      coinsPerClick,
    )
    if (gameState.offlineTime > 0) {
      const { offlineResourceCoins, offlineAutoCoins } = calculateOfflineIncome(
        gameState.offlineTime,
        resourceIncome,
        gameState.upgrades,
        coinsPerClick,
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
    setGameState({
      items: copy(cacheGameData.items),
      upgrades: copy(cacheGameData.upgrades),
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

  const displayIncome = Math.round(resourceIncome * 100) / 100

  const autoIncome = useMemo(() => {
    return (
      Math.round(
        coinsPerClick *
          gameState.upgrades.autoClicker.amount *
          gameState.upgrades.autoClicker.multiplier *
          100,
      ) / 100
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinsPerClick, gameState.upgrades.autoClicker.amount])

  const clicksIncome = useMemo(() => {
    return loopControl.estimatedClicksIncome
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopControl.estimatedClicksIncome])

  const contextValues = useMemo(
    () => ({
      clicksIncome,
      items: gameState.items,
      upgrades: gameState.upgrades,
      resourceIncome: displayIncome,
      autoIncome,
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
      clicksIncome,
      gameState.items,
      gameState.upgrades,
      displayIncome,
      autoIncome,
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
    <GameContext.Provider value={contextValues}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  return useContext(GameContext)
}
