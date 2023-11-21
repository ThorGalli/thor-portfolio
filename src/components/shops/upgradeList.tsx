'use client'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { useMemo, useState } from 'react'
import BuyableList from './buyableList'
import BuyableBar from './buyableBar'
import { filterByUpgradeStatus } from '@/features/clicker/data/upgrades'
import { UpgradeStatus } from '@/features/clicker/clickerTypes'
import { hasAllRequirements } from '@/features/clicker/utils'

export default function UpgradeList({ mobile }: { mobile?: boolean }) {
  const { upgrades, items, achievements } = useClickerContext()
  const [selectedStatus, setSelectedStatus] = useState(UpgradeStatus.AVAILABLE)
  const upgradeBars = useMemo(() => {
    return Object.values(upgrades)
      .filter(
        (upgrade) =>
          filterByUpgradeStatus(upgrade, selectedStatus) &&
          hasAllRequirements(upgrade, { upgrades, items, achievements }),
      )
      .map((upgrade) => {
        return <BuyableBar key={upgrade.id} buyable={upgrade} />
      })
  }, [upgrades, selectedStatus, items, achievements])

  return (
    <BuyableList
      title={
        <StatusFilterSelector
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      }
      list={upgradeBars}
      mobile={mobile}
    />
  )
}

function StatusFilterSelector({
  selectedStatus,
  setSelectedStatus,
}: {
  selectedStatus: UpgradeStatus
  setSelectedStatus: (status: UpgradeStatus) => void
}) {
  const options = Object.values(UpgradeStatus)

  return (
    <div className="flex flex-col gap-2">
      <p className="leading-none ">Upgrades</p>
      <div className="flex justify-center gap-2">
        {options.map((status) => (
          <button
            key={status}
            className={
              'rounded-md px-2 py-1 text-yellow-200 ' +
              (selectedStatus === status
                ? ' bg-slate-950 hover:bg-slate-900 '
                : ' bg-slate-600 hover:bg-slate-500 ')
            }
            onClick={() => setSelectedStatus(status)}
            disabled={selectedStatus === status}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  )
}
