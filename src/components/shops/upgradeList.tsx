'use client'
import { useGameContext } from '@/contexts/useGameContext'
import { useMemo } from 'react'
import BuyableList from './buyableList'
import BuyableBar from './buyableBar'

export default function UpgradeList() {
  const { upgrades } = useGameContext()

  const upgradeList = useMemo(() => {
    return Object.values(upgrades).map((upgrade) => upgrade)
  }, [upgrades])

  const upgradeBars = useMemo(() => {
    return upgradeList.map((upgrade, index, list) => {
      const isVisible = index === 0 || list[index - 1]?.amount > 0
      return (
        <BuyableBar
          key={upgrade.id}
          buyable={upgrade}
          visible={isVisible}
          counterSide="right"
        />
      )
    })
  }, [upgradeList])

  return <BuyableList title="Upgrades" list={upgradeBars} />
}
