'use client'
import { useGameContext } from '@/contexts/useGameContext'
import { getUpgradeInfo } from '@/data/upgrades'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { Item, Upgrade } from '@/types'

export default function Tooltip({
  side,
  buyable,
}: {
  side: 'left' | 'right'
  buyable: Item | Upgrade
}) {
  const { short } = useClickerCalculations()
  const { items } = useGameContext()

  const toolTipPlacement =
    side === 'left' ? ' right-full mr-2' : ' left-full ml-2'

  const isItem = 'income' in buyable
  const isUpgrade = 'multiplier' in buyable

  return (
    <div
      className={
        'absolute top-0 z-10 hidden flex-col rounded-[6px] border-2 border-slate-700 bg-slate-950 p-1 text-xs shadow-md lg:flex' +
        toolTipPlacement
      }
    >
      <p className="whitespace-nowrap font-bold text-yellow-200">
        {buyable.name}
      </p>
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
            {short(Math.round(buyable.income * buyable.amount * 10) / 10)}
          </p>
        </div>
      )}
      {isUpgrade && (
        <div className="flex flex-col leading-none text-slate-50">
          <p className=" py-2 text-slate-300">{buyable.description}</p>
          {getUpgradeInfo(buyable, items).map((info) => (
            <div
              key={buyable.id}
              className="flex items-center justify-between gap-2 whitespace-nowrap text-teal-200"
            >
              <p className="">{info.prefix}</p>
              <p className="text-yellow-500">{info.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
