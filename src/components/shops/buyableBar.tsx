import { useGameContext } from '@/contexts/useGameContext'
import useMathUtils from '@/utils/useMathUtils'
import React, { useState } from 'react'
import BaseCoin from '../coins/baseCoins'
import { Item, Upgrade } from '@/types'
import Tooltip from './tooltip'

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
  } = useGameContext()
  const { short } = useMathUtils()
  const adjustedPrice = getAdjustedItemPrice(buyable)
  const [isHovered, setHovered] = useState(false)

  if (!visible) {
    return null
  }

  const isDisabled = totalCoins < adjustedPrice

  const counterPlacement =
    infoSide === 'left' ? 'flex-column' : 'flex-row-reverse'
  const counterJustify = infoSide === 'left' ? 'justify-end' : 'justify-start'

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
      <div
        className={
          (buyable?.amount > 0 ? 'flex' : 'hidden') +
          ' min-w-[60px] text-4xl text-slate-500 ' +
          counterJustify
        }
      >
        {buyable.amount}
      </div>
      {isHovered && <Tooltip side={infoSide} buyable={buyable} />}
      <button
        onClick={() => buy(buyable)}
        className={'btn-yellow btn  w-56 flex-col rounded-[6px] p-1 text-left'}
        disabled={isDisabled}
      >
        <div className="text-lg">{buyable.name}</div>
        <div
          className={
            'flex items-center gap-1 text-sm font-bold ' +
            (isDisabled ? 'text-red-700' : 'text-green-500')
          }
        >
          {short(adjustedPrice)}
          <BaseCoin size={20} />
        </div>
      </button>
    </div>
  )
}
