import { useClickerContext } from '@/features/clicker/useClickerContext'
import React, { useState } from 'react'
import BaseCoin from '../coins/baseCoins'
import { Item, Upgrade } from '@/features/clicker/clickerTypes'
import Tooltip from './tooltip'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import {
  getAmountAndProgress,
  getIncome,
  getIncomePerAmount,
  getTier,
} from '@/features/clicker/data/items'
import { BuyAmount } from './resourceList'

export default function BuyableBar({
  buyable,
  amountSelected = BuyAmount.One,
  infoSide = 'left',
  visible,
}: {
  buyable: Item | Upgrade
  amountSelected?: BuyAmount
  infoSide?: 'left' | 'right'
  visible?: boolean
}) {
  const {
    getAdjustedPrice: getAdjustedItemPrice,
    totalCoins,
    buy,
  } = useClickerContext()
  const { short } = useClickerCalculations()
  const [isHovered, setHovered] = useState(false)

  if (!visible) {
    return null
  }

  const isItem = 'income' in buyable
  const isUpgrade = 'multiplier' in buyable
  const hasAny = buyable.amount > 0
  const showItem = hasAny && isItem

  const progress = showItem ? getAmountAndProgress(buyable) : null
  const adjustedPrice = getAdjustedItemPrice(buyable, getBuyAmount())
  const tier = showItem && buyable.amount > 0 ? getTier(buyable) : 0

  const isDisabled = totalCoins < adjustedPrice

  function getBuyAmount(): number {
    switch (amountSelected) {
      case BuyAmount.One:
        return 1
      case BuyAmount.Ten:
        return 10
      case BuyAmount.Quarter:
        return 25
      case BuyAmount.Next:
        if (!progress) return 1
        return progress?.next - progress?.current
    }
  }

  return (
    <div
      className={'relative flex flex-col items-center gap-2'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <button
        onClick={() => buy(buyable, getBuyAmount())}
        className={
          'btn-yellow flex w-full justify-between rounded-[6px] p-2 text-left transition-all duration-200'
        }
        disabled={isDisabled}
      >
        {/* left */}
        <div className="flex flex-col justify-between leading-tight">
          <p>
            {buyable.name}
            {tier > 0 && <span> [+{tier}]</span>}
          </p>
          <p>
            {hasAny && <span className="text-xl">{buyable.amount}</span>}
            {showItem && (
              <span className="text-sm text-white text-opacity-40">
                /{progress?.next}
              </span>
            )}
          </p>
          {showItem && (
            <p className="text-white text-opacity-40">
              Income: +{short(getIncome(buyable))}/s
            </p>
          )}
        </div>

        {/* right */}
        <div className="flex flex-col items-end justify-between">
          <p>Buy x{getBuyAmount()}</p>
          <div className={'price-tag'}>
            <p className={isDisabled ? 'text-red-700' : 'text-green-500'}>
              {short(adjustedPrice, 2)}
            </p>
            <BaseCoin size={20} />
          </div>
          {isItem && (
            <p className="leading-tight text-white text-opacity-40">
              +{short(getIncomePerAmount(buyable, getBuyAmount()))}/s
            </p>
          )}
        </div>
      </button>
      {isHovered && <Tooltip side={infoSide} buyable={buyable} />}
    </div>
  )
}
