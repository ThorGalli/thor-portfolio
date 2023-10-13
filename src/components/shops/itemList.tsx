'use client'
import { useClickerContext } from '@/contexts/useClickerContext'
import { useMemo } from 'react'
import BuyableList from './buyableList'
import BuyableBar from './buyableBar'

export default function ItemList() {
  const { items } = useClickerContext()

  const itemList = useMemo(() => {
    return Object.values(items).map((item) => item)
  }, [items])

  const itemBars = useMemo(() => {
    return itemList.map((item, index, list) => {
      const isVisible = index === 0 || list[index - 1]?.amount > 0
      return <BuyableBar key={item.id} buyable={item} visible={isVisible} />
    })
  }, [itemList])

  return <BuyableList title={'Resources'} list={itemBars} />
}
