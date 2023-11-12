'use client'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { useMemo, useState } from 'react'
import BuyableList from './buyableList'
import BuyableBar from './buyableBar'

export enum BuyAmount {
  One = 'x1',
  Ten = 'x10',
  Quarter = 'x25',
  Next = 'Next Tier',
}

export default function ResourceList({ mobile }: { mobile?: boolean }) {
  const { items } = useClickerContext()

  const [amountSelected, setAmountSelected] = useState(BuyAmount.One)

  const itemBars = useMemo(() => {
    return Object.values(items)
      .map((item, index, list) => {
        const isVisible = index === 0 || list[index - 1]?.amount > 0
        return (
          <BuyableBar
            key={item.id}
            buyable={item}
            visible={isVisible}
            amountSelected={amountSelected}
          />
        )
      })
      .toReversed()
  }, [items, amountSelected])

  return (
    <BuyableList
      title={
        <BuyAmountSelector
          buyAmount={amountSelected}
          setBuyAmount={setAmountSelected}
        />
      }
      list={itemBars}
      mobile={mobile}
    />
  )
}

function BuyAmountSelector({
  buyAmount,
  setBuyAmount,
}: {
  buyAmount: BuyAmount
  setBuyAmount: (amount: BuyAmount) => void
}) {
  const options = Object.values(BuyAmount)

  return (
    <div className="flex flex-col gap-2">
      {'Resources'}
      <div className="flex justify-center gap-2">
        {options.map((amount) => (
          <button
            key={amount}
            className={
              'rounded-md px-2 py-1 text-yellow-200 ' +
              (buyAmount === amount ? ' bg-slate-900' : 'bg-slate-800')
            }
            onClick={() => setBuyAmount(amount)}
          >
            {amount}
          </button>
        ))}
      </div>
    </div>
  )
}
