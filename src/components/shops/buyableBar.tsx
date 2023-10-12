import { useGameContext } from '@/contexts/useGameContext'
import useMathUtils from '@/utils/useMathUtils'
import React from 'react'
import BaseCoin from '../coins/baseCoins'
import { Item, Upgrade } from '@/types'

export default function BuyableBar({
  buyable,
  counterSide = 'left',
  visible,
}: {
  buyable: Item | Upgrade
  counterSide?: 'left' | 'right'
  visible?: boolean
}) {
  const {
    getAdjustedPrice: getAdjustedItemPrice,
    totalCoins,
    buy,
  } = useGameContext()
  const { short } = useMathUtils()
  const adjustedPrice = getAdjustedItemPrice(buyable)

  const isDisabled = totalCoins < adjustedPrice

  const counterPlacement =
    counterSide === 'left' ? 'flex-column' : 'flex-row-reverse'
  const counterJustify =
    counterSide === 'left' ? 'justify-end' : 'justify-start'

  if (!visible) {
    return null
  }
  return (
    <div className={'flex items-center justify-end  gap-2 ' + counterPlacement}>
      <div
        className={
          (buyable?.amount > 0 ? 'flex' : 'hidden') +
          ' min-w-[60px] text-4xl text-slate-500 ' +
          counterJustify
        }
      >
        {buyable.amount}
      </div>
      <button
        onClick={() => buy(buyable)}
        className={'btn-yellow btn w-56 flex-col rounded-[6px] p-1 text-left'}
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
