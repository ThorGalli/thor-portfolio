'use client'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { useMemo } from 'react'
import BuyableList from './buyableList'
import BuyableBar from './buyableBar'

export default function ResourceList() {
  const { items } = useClickerContext()

  const itemBars = useMemo(() => {
    return Object.values(items).map((item, index, list) => {
      const isVisible = index === 0 || list[index - 1]?.amount > 0
      return <BuyableBar key={item.id} buyable={item} visible={isVisible} />
    })
  }, [items])

  return <BuyableList title={'Resources'} list={itemBars} />
}
