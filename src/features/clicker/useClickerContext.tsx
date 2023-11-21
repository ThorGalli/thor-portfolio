import {
  getInitialClicker,
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
} from '@/features/clicker/clickerTypes'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { useSession } from 'next-auth/react'
import { useToast } from '@/contexts/useToast'
import { usePathname } from 'next/navigation'
import { getIncome } from './data/items'
import useAchievements from './hooks/useAchievements'
import { ShopAchievements, generateAchievements } from './data/achievements'
import { getTotalTiersMultiplier } from './data/upgrades'

const MINUTE = 1000 * 60
const BASE_COIN_VALUE = 1
const GAME_FPS = 10
const FRAME_TIME = 1000 / GAME_FPS
const SAVE_INTERVAL_IN_MINUTES = 1 * MINUTE

export const ClickerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // Custom utility hooks
  const { status } = useSession()

  const {
    getAdjustedPrice,
    calculateOfflineIncome,
    calculateTotalResourceIncome,
    calculateAutoCoins,
    estimateClicksIncome,
  } = useClickerCalculations()

  const {
    loading,
    saving,
    loadGameProgress,
    saveGameProgress,
    deleteCookies,
    setCacheGameData,
    cacheGameData,
    lastSaveTime,
  } = useClickerProgress()

  const { checkForAchievements } = useAchievements()

  // Loop Control state variables
  const [loopControl, setLoopControl] = useReducer(
    (prev: LoopControl, next: Partial<LoopControl>) => {
      return { ...prev, ...next }
    },
    getInitialControl(),
  )

  const path = usePathname()

  const adjustedFrameTime = useMemo(() => {
    return path === '/clicker' ? FRAME_TIME : FRAME_TIME * 10
  }, [path])

  // This variable switches between true and false every frame to trigger a re-render
  const [frameSwitch, setFrameSwitch] = useState(false)

  // Game state variables
  const [gameState, setGameState] = useReducer(
    (
      prev: ClickerState,
      next: {
        items?: ShopItems
        upgrades?: ShopUpgrades
        achievements?: ShopAchievements
        coins?: Partial<Coins>
        offlineTime?: number
        clicks?: number
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
    getInitialClicker(),
  )

  const { toast } = useToast()

  const coinsPerClick: number = useMemo(() => {
    const clickMultiplier =
      gameState.upgrades.clickMultiplier.multiplier **
      gameState.upgrades.clickMultiplier.amount

    const coinValue = BASE_COIN_VALUE * clickMultiplier
    return coinValue
  }, [gameState.upgrades])

  const totalCoins = Math.round(
    gameState.coins.fromClicks +
      gameState.coins.fromResources +
      gameState.coins.fromSweeper +
      gameState.coins.fromAuto -
      gameState.coins.spent,
  )

  const resourceIncomeMultiplier = useMemo(() => {
    return getTotalTiersMultiplier(gameState.items, gameState.upgrades)
  }, [gameState.upgrades, gameState.items])

  const resourceIncome = useMemo(() => {
    const baseResourceIncome = Object.values(gameState.items).reduce(
      (total, item: Item) => {
        return total + getIncome(item)
      },
      0,
    )

    return baseResourceIncome * resourceIncomeMultiplier
  }, [gameState.items, resourceIncomeMultiplier])

  const buy = useCallback(
    (buyable: Item | Upgrade, amount = 1) => {
      const price = getAdjustedPrice(buyable, amount)
      if (totalCoins < price) {
        return
      }
      if ('income' in buyable) {
        const newItems = { ...gameState.items }
        newItems[buyable.id].amount += amount
        setGameState({
          items: newItems,
          coins: { spent: gameState.coins.spent + price },
        })
      }
      if ('multiplier' in buyable) {
        if (buyable.amount + amount > buyable.maxAmount) return
        const newUpgrades = { ...gameState.upgrades }
        newUpgrades[buyable.id].amount += amount
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
    checkForAchievements(gameState, setGameState)
    setTimeout(() => {
      setFrameSwitch(!frameSwitch)
    }, adjustedFrameTime)
  }

  function updateIncome(currentTime: number) {
    const elapsedTime =
      currentTime - loopControl.lastFrameTime + gameState.offlineTime

    let resourceCoins = calculateTotalResourceIncome(
      elapsedTime,
      resourceIncome,
    )
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
    const { fromClicks, fromResources, fromAuto, fromSweeper, spent } = copy(
      cacheGameData.coins,
    )

    const initialClicker = getInitialClicker()
    const newItems = initialClicker.items
    const newUpgrades = initialClicker.upgrades
    const newAchievements = generateAchievements()
    console.log(newAchievements)

    Object.entries(cacheGameData.items).forEach(([key, value]) => {
      if (!newItems[key]) return
      newItems[key].amount = value.amount
    })
    Object.entries(cacheGameData.upgrades).forEach(([key, value]) => {
      if (!newUpgrades[key]) return
      newUpgrades[key].amount = value.amount
    })
    Object.entries(cacheGameData.achievements).forEach(([key, value]) => {
      if (!newAchievements[key]) return
      newAchievements[key].unlocked = value.unlocked
    })

    setGameState({
      items: newItems,
      upgrades: newUpgrades,
      offlineTime: cacheGameData.offlineTime,
      coins: {
        fromClicks: fromClicks || 0,
        fromResources: fromResources || 0,
        fromAuto: fromAuto || 0,
        fromSweeper: fromSweeper || 0,
        spent: spent || 0,
      },
      clicks: cacheGameData.clicks,
      achievements: newAchievements,
    })
    setCacheGameData({ ...cacheGameData, shouldReset: false })
    setFrameSwitch(!frameSwitch)
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
      clicks: gameState.clicks + 1,
    })
  }, [gameState.coins])

  const onSave = useCallback(async () => {
    if (loading || saving) return
    const totalIncome = resourceIncome + autoIncome
    const { success } = await saveGameProgress(gameState, status, totalIncome)
    if (success) toast({ message: 'Game Saved!', variant: 'info' })
    else toast({ message: 'Failed to save game.', variant: 'error' })
  }, [gameState, status])

  function checkForSave(currentTime: number) {
    if (currentTime - lastSaveTime > SAVE_INTERVAL_IN_MINUTES) {
      if (!saving) onSave()
    }
  }

  const onWinMineSweeper = useCallback(
    (prize: number) => {
      setGameState({
        coins: { fromSweeper: gameState.coins.fromSweeper + prize },
      })
    },
    [gameState.coins],
  )

  useEffect(() => {
    if (loading) return
    requestAnimationFrame(update)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameSwitch, loading])

  useEffect(() => {
    if (status === 'loading') return
    loadGameProgress(status)
  }, [status])

  // Variables for Display
  //
  //
  // ====================================================================
  const autoIncome = useMemo(() => {
    const { autoClicker, autoClicker2, autoClicker3, volunteerClicking } =
      gameState.upgrades
    const { volunteer } = gameState.items

    // Auto Clicker base income
    const autoClickerCoins =
      (autoClicker.amount * autoClicker.multiplier +
        autoClicker2.amount * autoClicker2.multiplier +
        autoClicker3.amount * autoClicker3.multiplier) *
      coinsPerClick

    // Volunteer Clicker income multiplier
    const volunteerMultiplier =
      1 +
      volunteer.amount * volunteerClicking.multiplier * volunteerClicking.amount

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
      resourceIncomeMultiplier,
      clicks: gameState.clicks,
      clicksIncome: displayClicksIncome,
      items: gameState.items,
      upgrades: gameState.upgrades,
      achievements: gameState.achievements,
      resourceIncome: displayResourceIncome,
      autoIncome: displayAutoIncome,
      totalCoins,
      buy,
      getAdjustedPrice,
      onClickCoin,
      onSave,
      onWinMineSweeper,
      loading,
      saving,
      lastSaveTime,
      deleteGameData: deleteCookies,
    }),
    [
      resourceIncomeMultiplier,
      gameState.clicks,
      displayClicksIncome,
      gameState.items,
      gameState.upgrades,
      gameState.achievements,
      displayResourceIncome,
      displayAutoIncome,
      totalCoins,
      buy,
      getAdjustedPrice,
      onClickCoin,
      onSave,
      onWinMineSweeper,
      loading,
      saving,
      lastSaveTime,
      deleteCookies,
    ],
  )

  return (
    <ClickerContext.Provider value={contextValues}>
      {children}
    </ClickerContext.Provider>
  )
}

const ClickerContext = createContext<ClickerContextProps>({
  resourceIncomeMultiplier: 0,
  clicks: 0,
  items: {},
  upgrades: {},
  achievements: {},
  buy: () => null,
  getAdjustedPrice: () => 0,
  totalCoins: 0,
  resourceIncome: 0,
  autoIncome: 0,
  clicksIncome: 0,
  onClickCoin: () => null,
  onSave: () => null,
  onWinMineSweeper: () => null,
  loading: true,
  saving: false,
  lastSaveTime: 0,
  deleteGameData: () => null,
})

export function useClickerContext() {
  return useContext(ClickerContext)
}
