'use client'
import { useGameContext } from '@/contexts/useGameContext'
import useMathUtils from '@/utils/useMathUtils'
import BaseCoin from './baseCoins'

export default function MainCoin() {
  const {
    passiveIncome,
    hoverIncome: autoClickerIncome,
    totalCoins,
    clicksIncome,
    clickCoin,
    setMouseOrTouchOnCoin,
  } = useGameContext()
  const { short } = useMathUtils()

  function handleClick() {
    clickCoin()
  }
  return (
    <div className="mt-5 flex transform flex-col items-center justify-start gap-5">
      <div>Passive Income: {short(passiveIncome, 2)} coins/s</div>
      <div>AutoClicker Income: {short(autoClickerIncome, 2)} coins/s</div>
      <div>Clicks Income: {short(clicksIncome, 2)} coins/s</div>
      <div
        id="coin"
        onClick={handleClick}
        onMouseEnter={() => setMouseOrTouchOnCoin(true)}
        onMouseLeave={() => setMouseOrTouchOnCoin(false)}
        onTouchStart={() => setMouseOrTouchOnCoin(true)}
        onTouchEnd={() => setMouseOrTouchOnCoin(false)}
        style={{ transition: 'all 0.1s ease-in-out' }}
        className="cursor-pointer overflow-hidden rounded-full shadow-inner transition-all hover:scale-110 active:scale-95"
      >
        <BaseCoin />
      </div>
      <div>Coins: {short(totalCoins, 2)}</div>
    </div>
  )
}
