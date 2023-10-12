'use client'
import { useGameContext } from '@/contexts/useGameContext'
import useMathUtils from '@/utils/useMathUtils'
import BaseCoin from './baseCoins'

export default function MainCoin() {
  const { passiveIncome, autoIncome, totalCoins, clicksIncome, clickCoin } =
    useGameContext()
  const { short } = useMathUtils()

  function handleClick() {
    clickCoin()
  }
  return (
    <div className="flex transform flex-col items-center justify-start gap-5">
      <div className="flex w-full justify-center">
        <p className="text-yellow-200">Income</p>
      </div>
      <div className="flex w-full justify-between">
        <p>Resources:&nbsp;</p> <p>{short(passiveIncome, 2)} coins/s</p>
      </div>
      <div className="flex w-full justify-between">
        <p>Auto Clicker:&nbsp;</p>
        <p>{short(autoIncome, 2)} coins/s</p>
      </div>
      <div className="flex w-full justify-between">
        <p>Clicks:&nbsp;</p>
        <p>{short(clicksIncome, 2)} coins/s</p>
      </div>
      <div
        id="coin"
        onClick={handleClick}
        style={{ transition: 'all 0.1s ease-in-out' }}
        className="cursor-pointer overflow-hidden rounded-full shadow-inner transition-all hover:scale-110 active:scale-95"
      >
        <BaseCoin />
      </div>
      <div>Coins: {short(totalCoins, 2)}</div>
    </div>
  )
}
