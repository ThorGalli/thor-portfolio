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
  const [saving, setSaving] = useState(false)

  function deleteCookies() {
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

  async function saveGameProgress(
    gameState: ClickerState,
    status: 'authenticated' | 'unauthenticated' | 'loading',
    totalIncome: number,
  ) {
    if (status === 'loading') return { success: false }
    setSaving(true)
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

    try {
      const saveData = {
        items: compactItems,
        upgrades: compactUpgrades,
        coins: gameState.coins,
        saveTime: currentDateTimeInMS,
        income: totalIncome,
      }
      if (status === 'unauthenticated') saveToCookies(JSON.stringify(saveData))
      if (status === 'authenticated')
        await saveToServer(JSON.stringify(saveData))
    } catch (error) {
      console.log(error)
      return { success: false }
    } finally {
      setSaving(false)
    }
    setLastSaveTime(currentRunTime)
    return { success: true }
  }

  function saveToCookies(stringfiedJSON: string) {
    setCookie(null, 'thor-cookie-saveData', stringfiedJSON, {
      maxAge: 2147483647,
      path: '/',
      sameSite: 'Strict',
    })
  }

  async function saveToServer(stringfiedJSON: string) {
    await fetch('/api/users/saveData', {
      method: 'POST',
      body: stringfiedJSON,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async function loadGameProgress(
    status: 'authenticated' | 'unauthenticated' | 'loading',
  ) {
    let loadedData = null
    if (status === 'loading') return
    setLoading(true)
    if (status === 'unauthenticated') {
      loadedData = loadFromCookies()
    }
    if (status === 'authenticated') {
      loadedData = await loadFromServer()
    }
    if (!loadedData) {
      setLoading(false)
      return null
    }

    const parsedData = JSON.parse(loadedData)
    const { items, upgrades, coins, saveTime } = parsedData

    if (!items || !upgrades || !coins || !saveTime) {
      setLoading(false)
      return null
    }

    const offlineTime = new Date().getTime() - saveTime

    setCacheGameData({
      shouldReset: true,
      items,
      upgrades,
      coins,
      offlineTime,
    })

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  function loadFromCookies() {
    try {
      const cookies = parseCookies(null)
      const saveData = cookies['thor-cookie-saveData']
      if (!saveData) return null
      return saveData
    } catch (error) {
      console.log(error)
    }
    return null
  }

  async function loadFromServer() {
    const response = await fetch('/api/users/saveData', { method: 'GET' })
    const serverData = await response.json()

    // If the user is new, the server will return an error and we will load from cookies
    const firstTime =
      serverData?.error?.details === 'The result contains 0 rows'
    if (firstTime) return loadFromCookies()

    // If the user is not new, the server will return the saveData
    const saveData = serverData?.data?.clicker_state
    if (!saveData) return null
    return JSON.stringify(saveData)
  }

  return {
    saveGameProgress,
    loadGameProgress,
    deleteCookies,
    setCacheGameData,
    cacheGameData,
    lastSaveTime,
    loading,
    saving,
  }
}
