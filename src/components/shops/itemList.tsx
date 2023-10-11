'use client'
import { useGameContext } from '@/contexts/useGameContext'
import { useMemo } from 'react'
import BuyableList from './buyableList'
import BuyableBar from './buyableBar'

export default function ItemList() {
  const { items } = useGameContext()

  const itemBars = useMemo(() => {
    return Object.values(items).map((item) => (
      <BuyableBar key={item.id} buyable={item} />
    ))
  }, [items])

  return <BuyableList list={itemBars} />
}
