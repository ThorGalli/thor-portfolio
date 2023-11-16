'use client'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { useMemo } from 'react'
import BuyableList from './buyableList'
import BuyableBar from './buyableBar'
import { shouldShowUpgrade } from '@/features/clicker/data/upgrades'

export default function UpgradeList({ mobile }: { mobile?: boolean }) {
  const { upgrades } = useClickerContext()

  const upgradeBars = useMemo(() => {
    return Object.values(upgrades).map((upgrade) => {
      const isVisible = shouldShowUpgrade(upgrade, upgrades)
      return (
        <BuyableBar
          key={upgrade.id}
          buyable={upgrade}
          visible={isVisible}
          infoSide="right"
        />
      )
    })
  }, [upgrades])

  return <BuyableList title="Upgrades" list={upgradeBars} mobile={mobile} />
}
