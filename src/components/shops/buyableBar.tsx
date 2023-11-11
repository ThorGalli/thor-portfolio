import { useClickerContext } from '@/features/clicker/useClickerContext'
import React, { useState } from 'react'
import BaseCoin from '../coins/baseCoins'
import { Item, Upgrade } from '@/features/clicker/clickerTypes'
import Tooltip from './tooltip'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import {
  getAmountAndProgress,
  getIncome,
  getSingleIncome,
  getTier,
} from '@/features/clicker/data/items'

export default function BuyableBar({
  buyable,
  infoSide = 'left',
  visible,
}: {
  buyable: Item | Upgrade
  infoSide?: 'left' | 'right'
  visible?: boolean
}) {
  const {
    getAdjustedPrice: getAdjustedItemPrice,
    totalCoins,
    buy,
  } = useClickerContext()
  const { short } = useClickerCalculations()
  const adjustedPrice = getAdjustedItemPrice(buyable)
  const [isHovered, setHovered] = useState(false)

  if (!visible) {
    return null
  }

  const isDisabled = totalCoins < adjustedPrice

  const showItem = buyable.amount > 0 && 'income' in buyable
  const isUpgrade = 'multiplier' in buyable

  const progress = showItem ? getAmountAndProgress(buyable) : null
  return (
    <div
      className={'relative flex flex-col items-center gap-2'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <button
        onClick={() => buy(buyable)}
        className={
          'btn-yellow flex w-full justify-between rounded-[6px] p-2 text-left'
        }
        disabled={isDisabled}
      >
        {/* left */}
        <div className="flex flex-col justify-between leading-tight">
          <p>{buyable.name}</p>
          {showItem && (
            <p className="text-white text-opacity-40">
              Total Income: +{short(getIncome(buyable))}/s
            </p>
          )}
          <p>
            <span className="text-2xl">{buyable.amount}</span>
            {showItem && <span>/{progress?.next}</span>}
          </p>
        </div>

        {/* right */}
        <div className="flex flex-col items-end justify-center">
          <div className={'price-tag'}>
            <p>Buy: </p>
            <p className={isDisabled ? 'text-red-700' : 'text-green-500'}>
              {short(adjustedPrice, 2)}
            </p>
            <BaseCoin size={20} />
          </div>
          <div
            className={
              'flex flex-col justify-end text-right leading-tight text-white text-opacity-40'
            }
          >
            {'income' in buyable && (
              <p>Adds +{short(getSingleIncome(buyable))}/s</p>
            )}
          </div>
        </div>
      </button>
      {isHovered && <Tooltip side={infoSide} buyable={buyable} />}
    </div>
  )
}
