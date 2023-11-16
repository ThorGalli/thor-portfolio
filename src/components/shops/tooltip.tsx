'use client'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { getUpgradeInfo } from '@/features/clicker/data/upgrades'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { Item, Upgrade } from '@/features/clicker/clickerTypes'
import { getIncome, getIncomePerAmount } from '@/features/clicker/data/items'

export default function Tooltip({
  ref,
  buyable,
  style = {},
}: {
  ref?: React.RefObject<HTMLDivElement>
  buyable: Item | Upgrade
  mobile?: boolean
  style?: React.CSSProperties
}) {
  const { short } = useClickerCalculations()
  const { items, resourceIncome, autoIncome } = useClickerContext()

  const totalIncome = resourceIncome + autoIncome

  const isItem = 'income' in buyable
  const isUpgrade = 'multiplier' in buyable

  return (
    <div
      ref={ref}
      className={
        'z-10 flex w-full flex-col  overflow-clip border-t border-white border-opacity-20 pt-2 text-xs'
      }
      style={style}
    >
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
          <p className="text-yellow-500">
            {' '}
            {short(getIncomePerAmount(buyable))}
          </p>
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
