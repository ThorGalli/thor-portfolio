'use client'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { useMemo, useState } from 'react'
import BuyableList from './buyableList'
import BuyableBar from './buyableBar'
import { hasAllRequirements } from '@/features/clicker/utils'
import { getTotalTiers } from '@/features/clicker/data/items'

export enum BuyAmount {
  ONE = 'x1',
  TEN = 'x10',
  QUARTER = 'x25',
  NEXT = 'Next Tier',
}

export default function ResourceList({ mobile }: { mobile?: boolean }) {
  const { items, achievements, upgrades } = useClickerContext()

  const [selectedAmount, setSelectedAmount] = useState(BuyAmount.ONE)

  const itemBars = useMemo(() => {
    return Object.values(items)
      .filter((item) =>
        hasAllRequirements(item, { items, achievements, upgrades }),
      )
      .map((item) => {
        return (
          <BuyableBar
            key={item.id}
            buyable={item}
            selectedAmount={selectedAmount}
          />
        )
      })
      .toReversed()
  }, [items, selectedAmount, achievements, upgrades])

  return (
    <BuyableList
      title={
        <ResourcesHeader
          totalTiers={getTotalTiers(items)}
          buyAmount={selectedAmount}
          setBuyAmount={setSelectedAmount}
        />
      }
      list={itemBars}
      mobile={mobile}
    />
  )
}

function ResourcesHeader({
  totalTiers,
  buyAmount,
  setBuyAmount,
}: {
  totalTiers: number
  buyAmount: BuyAmount
  setBuyAmount: (amount: BuyAmount) => void
}) {
  const options = Object.values(BuyAmount)

  return (
    <div className="flex flex-col gap-2">
      <p className="leading-none ">
        Resources{totalTiers > 0 && ' ' + totalTiers + '⭐'}
      </p>
      <div className="flex justify-center gap-2">
        {options.map((amount) => (
          <button
            key={amount}
            className={
              'rounded-md px-2 py-1 text-yellow-200 ' +
              (buyAmount === amount
                ? ' bg-slate-950 hover:bg-slate-900 '
                : ' bg-slate-600 hover:bg-slate-500 ')
            }
            onClick={() => setBuyAmount(amount)}
            disabled={buyAmount === amount}
          >
            {amount}
          </button>
        ))}
      </div>
    </div>
  )
}
