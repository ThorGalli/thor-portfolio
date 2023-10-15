import { Buyable, LoopControl } from '@/features/clicker/clickerTypes'

export default function useClickerCalculations() {
  function short(num: number, decimals = 1) {
    if (num < 1000) return num
    const units = ['', 'K', 'M', 'B', 'T', 'Q', 'QQ', 'S', 'SS', 'O', 'N']
    const unit = Math.floor((num.toFixed(0).length - 1) / 3)
    const numShort = (num / 1000 ** unit).toFixed(decimals)
    return `${numShort} ${units[unit]}`
  }

  function getAdjustedPrice(buyable: Buyable) {
    return Math.round(buyable.price * buyable.priceMultiplier ** buyable.amount)
  }

  function calculateOfflineIncome(
    offlineTime: number,
    resourceIncome: number,
    autoIncome: number,
  ) {
    const offlineResourceCoins = calculateResourceIncome(
      offlineTime,
      resourceIncome,
    )
    const offlineAutoCoins = calculateAutoCoins(offlineTime, autoIncome)
    return { offlineResourceCoins, offlineAutoCoins }
  }

  function calculateResourceIncome(
    elapsedTime: number,
    resourceIncome: number,
  ) {
    return (resourceIncome * elapsedTime) / 1000
  }

  function calculateAutoCoins(elapsedTime: number, autoIncome: number) {
    return (elapsedTime * autoIncome) / 1000 || 0
  }

  function estimateClicksIncome(
    loopControl: LoopControl,
    setLoopControl: (loopControl: Partial<LoopControl>) => void,
    currentTime: number,
    coinsPerClick: number,
  ) {
    if (loopControl.last5Clicks[0] === 0) return 0
    if (currentTime - loopControl.lastClickTime > 3000) {
      setLoopControl({ last5Clicks: [0, 0, 0, 0, 0] })
      return 0
    }
    if (currentTime - loopControl.lastClickUpdate < 1000)
      return loopControl.estimatedClicksIncome

    const totalClickTime = loopControl.last5Clicks.reduce(
      (total, time) => total + time,
      0,
    )
    const timeSinceLastClick = currentTime - loopControl.lastClickTime
    const averageClickTime = (totalClickTime + timeSinceLastClick) / 6
    const estimative = (1000 / averageClickTime) * coinsPerClick
    setLoopControl({ lastClickUpdate: currentTime })
    return Math.round(estimative)
  }

  return {
    short,
    getAdjustedPrice,
    calculateOfflineIncome,
    calculateResourceIncome,
    calculateAutoCoins,
    estimateClicksIncome,
  }
}
