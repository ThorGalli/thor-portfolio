'use client'
import { useGameContext } from '@/contexts/useGameContext'
import BaseCoin from './baseCoins'
import SaveGameButton from '../settings/saveGameButton'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'

export default function MainCoin() {
  const { resourceIncome, autoIncome, totalCoins, clicksIncome, onClickCoin } =
    useGameContext()
  const { short } = useClickerCalculations()

  function handleClick() {
    onClickCoin()
  }

  const totalIncome =
    Math.round((resourceIncome + autoIncome + clicksIncome) * 100) / 100
  return (
    <div className="flex transform flex-col items-center justify-start gap-2">
      <SaveGameButton />
      <div className="flex w-full justify-center">
        <p className="text-yellow-200">Income</p>
      </div>
      <div className="flex w-full justify-between">
        <p>Resources:&nbsp;</p> <p>{short(resourceIncome, 2)} coins/s</p>
      </div>
      <div className="flex w-full justify-between">
        <p>Auto Clicker:&nbsp;</p>
        <p>{short(autoIncome, 2)} coins/s</p>
      </div>
      <div className="flex w-full justify-between">
        <p>Clicks:&nbsp;</p>
        <p>{short(clicksIncome, 2)} coins/s</p>
      </div>
      <div className="flex w-full justify-between border-t border-yellow-200 pt-2">
        <p>Total:&nbsp;</p>
        <p>{short(totalIncome, 2)} coins/s</p>
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
