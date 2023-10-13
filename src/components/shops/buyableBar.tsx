import { useClickerContext } from '@/contexts/useClickerContext'
import React, { useState } from 'react'
import BaseCoin from '../coins/baseCoins'
import { Item, Upgrade } from '@/types'
import Tooltip from './tooltip'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'

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

  return (
    <div
      className={
        'relative flex items-center justify-end gap-2 ' + counterPlacement
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      {isHovered && <Tooltip side={infoSide} buyable={buyable} />}

      <button
        onClick={() => buy(buyable)}
        className={
          'btn-yellow w-full items-center justify-between overflow-hidden rounded-[6px] p-1 text-right'
        }
        disabled={isDisabled}
      >
        <div
          id="counter"
          className={'flex-grow  text-4xl text-white text-opacity-40'}
        >
          {buyable.amount || ''}
        </div>
        <div id="nameAndPriceWrapper" className="flex w-52 flex-col">
          <p className="text-lg">{buyable.name}</p>
          <div
            className={
              'flex items-center justify-end gap-1 text-sm font-bold ' +
              (isDisabled ? 'text-red-700' : 'text-green-500')
            }
          >
            <p>{short(adjustedPrice)}</p>
            <BaseCoin size={20} />
          </div>
        </div>
      </button>
    </div>
  )
}
