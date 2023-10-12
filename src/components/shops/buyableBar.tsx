import { useGameContext } from '@/contexts/useGameContext'
import useMathUtils from '@/utils/useMathUtils'
import React from 'react'
import BaseCoin from '../coins/baseCoins'
import { Buyable } from '@/data/buyable'

export default function BuyableBar({
  buyable,
  counterSide = 'left',
}: {
  buyable: Buyable
  counterSide?: 'left' | 'right'
}) {
  const {
    getAdjustedPrice: getAdjustedItemPrice,
    totalCoins,
    buy,
  } = useGameContext()
  const { short } = useMathUtils()
  const adjustedPrice = getAdjustedItemPrice(buyable)

  const isDisabled = totalCoins < adjustedPrice
  const disabledWrapperProps = isDisabled
    ? 'bg-slate-950 text-slate-500 hover:bg-slate-900'
    : 'cursor-pointer bg-yellow-900 hover:bg-yellow-700 active:bg-yellow-950 '

  const counterPlacement =
    counterSide === 'left' ? 'flex-column' : 'flex-row-reverse'
  const counterJustify =
    counterSide === 'left' ? 'justify-end' : 'justify-start'

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
      <div
        onClick={() => buy(buyable)}
        className={
          'flex w-56 select-none flex-col rounded-[6px] border-gray-300 p-1' +
          ' ' +
          disabledWrapperProps
        }
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
      </div>
    </div>
  )
}
