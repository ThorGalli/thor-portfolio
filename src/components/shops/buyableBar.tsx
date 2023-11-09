import { useClickerContext } from '@/features/clicker/useClickerContext'
import React, { useState } from 'react'
import BaseCoin from '../coins/baseCoins'
import { Item, Upgrade } from '@/features/clicker/clickerTypes'
import Tooltip from './tooltip'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { getAmountAndProgress, getTier } from '@/features/clicker/data/items'

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

  const counterPlacement =
    infoSide === 'left' ? 'flex-column' : 'flex-row-reverse'

  const showItem = buyable.amount > 0 && 'income' in buyable
  const isUpgrade = 'multiplier' in buyable

  const progress = showItem ? getAmountAndProgress(buyable) : null
  return (
    <div
      className={
        'relative flex flex-col items-center gap-2 ' + counterPlacement
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <button
        onClick={() => buy(buyable)}
        className={
          'btn-yellow flex w-full flex-col rounded-[6px] p-1 text-left'
        }
        disabled={isDisabled}
      >
        <div id="nameAndPriceWrapper" className="flex w-52 flex-col">
          <p className="text-lg">{buyable.name}</p>
        </div>
        <div className="flex justify-between">
          <div
            id="counter"
            className={
              'flex flex-col justify-end text-lg leading-none text-white text-opacity-40'
            }
          >
            {showItem ? <p>{' Lv. ' + (getTier(buyable) + 1)}</p> : null}
            {showItem ? (
              <p>{progress?.current + '/' + progress?.next}</p>
            ) : null}
            <p className="text-2xl">{(isUpgrade && buyable.amount) || ''}</p>
          </div>
          <div
            className={
              'price-tag ' + (isDisabled ? 'text-red-700' : 'text-green-500')
            }
          >
            <p>{short(adjustedPrice, 2)}</p>
            <BaseCoin size={20} />
          </div>
        </div>
      </button>
      {isHovered && <Tooltip side={infoSide} buyable={buyable} />}
    </div>
  )
}
