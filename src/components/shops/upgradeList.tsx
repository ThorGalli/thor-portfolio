'use client'
import { useGameContext } from '@/contexts/useGameContext'
import { useMemo } from 'react'
import BuyableList from './buyableList'
import BuyableBar from './buyableBar'

export default function UpgradeList() {
  const { upgrades } = useGameContext()

  const upgradeBars = useMemo(() => {
    return Object.values(upgrades).map((upgrade) => (
      <BuyableBar key={upgrade.id} buyable={upgrade} counterSide="right" />
    ))
  }, [upgrades])

  return <BuyableList list={upgradeBars} />
}
