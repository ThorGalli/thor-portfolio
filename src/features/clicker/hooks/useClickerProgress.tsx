import { getInitialClicker } from '@/features/clicker/data/initialValues'
import { ClickerState } from '@/features/clicker/clickerTypes'
import { parseCookies, setCookie } from 'nookies'
import { useState } from 'react'
import { setTimeout } from 'timers'

export default function useClickerProgress() {
  const [cacheGameData, setCacheGameData] = useState<ClickerState>({
    shouldReset: false,
    ...getInitialClicker(),
  })
  const [loading, setLoading] = useState(true)
  const [lastSaveTime, setLastSaveTime] = useState(performance.now())

  function loadGameData() {
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
      const offlineTime = new Date().getTime() - saveTime
      setCacheGameData({
        shouldReset: true,
        items,
        upgrades,
        coins,
        offlineTime,
      })
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  function deleteGameData() {
    setLoading(true)
    setCookie(null, 'thor-cookie-saveData', '', {
      maxAge: 0,
      path: '/',
      sameSite: 'Strict',
    })
    setCacheGameData({
      shouldReset: true,
      ...getInitialClicker(),
    })
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  function saveGameData(gameState: ClickerState) {
    const currentDateTimeInMS = new Date().getTime()
    const currentRunTime = performance.now()
    const compactItems = Object.fromEntries(
      Object.entries(gameState.items).map(([key, value]) => [
        key,
        { id: value.id, amount: value.amount },
      ]),
    )
    const compactUpgrades = Object.fromEntries(
      Object.entries(gameState.upgrades).map(([key, value]) => [
        key,
        { id: value.id, amount: value.amount },
      ]),
    )

    const saveData = {
      items: compactItems,
      upgrades: compactUpgrades,
      coins: gameState.coins,
      saveTime: currentDateTimeInMS,
    }

    try {
      setCookie(null, 'thor-cookie-saveData', JSON.stringify(saveData), {
        maxAge: 2147483647,
        path: '/',
        sameSite: 'Strict',
      })
    } catch (error) {
      console.log(error)
    }

    setLastSaveTime(currentRunTime)
  }

  return {
    saveGameData,
    deleteGameData,
    loadGameData,
    setCacheGameData,
    cacheGameData,
    loading,
    lastSaveTime,
  }
}
