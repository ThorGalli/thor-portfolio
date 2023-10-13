'use client'
import { useGameContext } from '@/contexts/useGameContext'
import { Item, Upgrade } from '@/types'
import useMathUtils from '@/utils/useMathUtils'

export default function Tooltip({
  side,
  buyable,
}: {
  side: 'left' | 'right'
  buyable: Item | Upgrade
}) {
  const { short } = useMathUtils()
  const { items } = useGameContext()

  const toolTipPlacement =
    side === 'left' ? ' right-full mr-2' : ' left-full ml-2'

  const isItem = 'income' in buyable
  const isUpgrade = 'multiplier' in buyable

  function getUpgradeTotalDescription(buyable: Upgrade) {
    switch (buyable.id) {
      case 'autoClicker':
        return {
          prefix: 'Current clicks/s:',
          value: `${buyable.amount * buyable.multiplier}`,
        }
      case 'clickMultiplier':
        return {
          prefix: 'Current multiplier:',
          value: `x${Math.pow(buyable.multiplier, buyable.amount)}`,
        }
      case 'volunteerClicking':
        return {
          prefix: 'Current increase:',
          value: `+${
            Math.round(
              buyable.amount *
                buyable.multiplier *
                items.volunteer.amount *
                10000,
            ) / 100
          }%`,
        }
      default:
        return {
          prefix: 'Current multiplier:',
          value: `${buyable.amount * buyable.multiplier}`,
        }
    }
  }

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
            {short(Math.round(buyable.income * buyable.amount * 10) / 10)}
          </p>
        </div>
      )}
      {isUpgrade && (
        <div className="text-slate-50">
          <p className="text-slate-300">{buyable.description}</p>
          <div className="flex items-center justify-between gap-2 whitespace-nowrap text-teal-200">
            <p className="">{getUpgradeTotalDescription(buyable).prefix}</p>
            <p className="text-yellow-500">
              {getUpgradeTotalDescription(buyable).value}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
