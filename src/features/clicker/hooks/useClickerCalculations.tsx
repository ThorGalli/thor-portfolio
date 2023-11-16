import { Buyable, LoopControl } from '@/features/clicker/clickerTypes'

export default function useClickerCalculations() {
  function short(num: number | string, decimals = 1) {
    if (typeof num === 'string') return num
    if (num < 1) return num.toFixed(2)
    if (num < 1000) return num.toFixed(0)
    const units = ['', 'K', 'M', 'B', 'T', 'Q', 'QQ', 'S', 'SS', 'O', 'N']
    const unit = Math.floor((num.toFixed(0).length - 1) / 3)
    const numShort = num / 1000 ** unit
    const rounded = numShort.toFixed(decimals)
    return `${rounded} ${units[unit]}`
  }

  function getAdjustedPrice(buyable: Buyable, amount: number) {
    let price = 0
    for (let i = 0; i < amount; i++) {
      price += buyable.price * buyable.priceMultiplier ** (buyable.amount + i)
    }
    return price
  }

  function calculateOfflineIncome(
    offlineTime: number,
    resourceIncome: number,
    autoIncome: number,
  ) {
    const offlineResourceCoins = calculateTotalResourceIncome(
      offlineTime,
      resourceIncome,
    )
    const offlineAutoCoins = calculateAutoCoins(offlineTime, autoIncome)
    return { offlineResourceCoins, offlineAutoCoins }
  }

  function calculateTotalResourceIncome(
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
    calculateTotalResourceIncome,
    calculateAutoCoins,
    estimateClicksIncome,
  }
}
