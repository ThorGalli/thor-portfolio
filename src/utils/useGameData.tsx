import { getInitialGame } from '@/data/initialValues'
import { GameState } from '@/types'
import { parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'
import { setTimeout } from 'timers'

export default function useGameData() {
  const [cacheGameData, setCacheGameData] = useState<GameState>({
    shouldReset: false,
    ...getInitialGame(),
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
      console.log('loading false')
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
      ...getInitialGame(),
    })
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  function saveGameData(gameState: GameState) {
    const currentDateTimeInMS = new Date().getTime()
    const currentRunTime = performance.now()
    const saveData = {
      items: gameState.items,
      upgrades: gameState.upgrades,
      coins: gameState.coins,
      saveTime: currentDateTimeInMS,
    }
    setCookie(null, 'thor-cookie-saveData', JSON.stringify(saveData), {
      maxAge: 12 * 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Strict',
    })
    setLastSaveTime(currentRunTime)
  }

  useEffect(() => {
    console.log('loading', loading)
  }, [loading])

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
