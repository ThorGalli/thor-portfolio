import { useGameContext } from '@/contexts/useGameContext'
import useMathUtils from '@/utils/useMathUtils'
import React, { useState } from 'react'
import BaseCoin from '../coins/baseCoins'
import { Item, Upgrade } from '@/types'

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
  const toolTipPlacement =
    infoSide === 'left' ? ' right-full mr-2' : ' left-full ml-2'

  const isItem = 'income' in buyable
  const isUpgrade = 'multiplier' in buyable

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
      {isHovered && (
        <div
          className={
            'absolute top-0 z-10 hidden flex-col rounded-[6px] border-2 border-slate-700 bg-slate-950 p-1 text-xs shadow-md lg:flex' +
            toolTipPlacement
          }
        >
          <p className="whitespace-nowrap font-bold text-yellow-200">
            {buyable.name}
          </p>
          {/* <p className="text-slate-300">{buyable.description}</p> */}
          {isItem && (
            <div className="flex items-center justify-between gap-2 whitespace-nowrap text-teal-200">
              <p>Income/s:</p>
              <p className="text-yellow-500"> {short(buyable.income)}</p>
            </div>
          )}
          {isItem && buyable.amount > 1 && (
            <div className="flex items-center justify-between gap-2 whitespace-nowrap text-teal-200">
              <p>Total (x{buyable.amount}): </p>
              <p className="text-yellow-500">
                {short(buyable.income * buyable.amount)}
              </p>
            </div>
          )}
          {isUpgrade && (
            <div className="text-slate-50">
              <p className="text-slate-300">
                {buyable.description.split('{br}')[0]}
              </p>
              <div className="flex items-center justify-between gap-2 whitespace-nowrap text-teal-200">
                <p>{buyable.description.split('{br}')[1]}</p>
                <p>{buyable.amount * buyable.multiplier}</p>
              </div>
            </div>
          )}
        </div>
      )}
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
