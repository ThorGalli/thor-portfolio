'use client'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { getUpgradeInfo } from '@/features/clicker/data/upgrades'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { Item, Upgrade } from '@/features/clicker/clickerTypes'
import { getIncome, getSingleIncome } from '@/features/clicker/data/items'

export default function Tooltip({
  side,
  buyable,
}: {
  side: 'left' | 'right'
  buyable: Item | Upgrade
  mobile?: boolean
}) {
  const { short } = useClickerCalculations()
  const { items, resourceIncome, autoIncome } = useClickerContext()

  const totalIncome = resourceIncome + autoIncome

  const toolTipPlacement =
    side === 'left' ? ' lg:right-full lg:mr-2' : ' lg:left-full lg:ml-2'

  const isItem = 'income' in buyable
  const isUpgrade = 'multiplier' in buyable

  return (
    <div
      className={
        'absolute top-full z-10 ml-10 mt-2 flex flex-col rounded-[6px] border-slate-700 bg-slate-950 p-1 text-xs shadow-md lg:top-0 lg:mt-0 lg:border-2 lg:p-1' +
        toolTipPlacement
      }
    >
      <p className="whitespace-nowrap font-bold text-yellow-200">
        {buyable.name}
      </p>
      {isItem && (
        <div className="flex items-center justify-between gap-2 whitespace-nowrap text-teal-200">
          <p className="text-slate-200">
            {((getIncome(buyable) * 100) / totalIncome).toFixed(2)}% of your
            total income
          </p>
        </div>
      )}
      {isItem && (
        <div className="flex items-center justify-between gap-2 whitespace-nowrap text-teal-200">
          <p>Income/s:</p>
          <p className="text-yellow-500"> {short(getSingleIncome(buyable))}</p>
        </div>
      )}
      {isItem && buyable.amount > 1 && (
        <div className="flex items-center justify-between gap-2 whitespace-nowrap text-teal-200">
          <p>Total (x{buyable.amount}): </p>
          <p className="text-yellow-500">{short(getIncome(buyable))}</p>
        </div>
      )}

      {isUpgrade && (
        <div className="flex flex-col leading-none text-slate-50">
          <p className=" whitespace-break-spaces py-2 text-slate-300">
            {buyable.description}
          </p>
          {getUpgradeInfo(buyable, items).map((info) => (
            <div
              key={buyable.id + '-' + info.prefix}
              className="flex items-center justify-between gap-2 whitespace-nowrap text-teal-200"
            >
              <p className="">{info.prefix}</p>
              <p className="text-yellow-500">
                {typeof info.value === 'number'
                  ? short(info.value)
                  : info.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
