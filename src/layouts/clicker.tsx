'use client'
import React, { useState } from 'react'
import MainCoin from '@/components/coins/mainCoin'
import ItemList from '@/components/shops/itemList'
import UpgradeList from '@/components/shops/upgradeList'
import Drawer from '@/components/navigation/drawer'
import { useGameContext } from '@/contexts/useGameContext'

export default function ClickerGame() {
  const [upgradeDrawerOpen, setUpgradeDrawerOpen] = useState(false)
  const [itemDrawerOpen, setItemDrawerOpen] = useState(false)
  const drawerButtonClass =
    'h-fit rounded-[14px] border-4 border-yellow-800 px-2 py-4 text-yellow-200 bg-yellow-700'

  const { loading } = useGameContext()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between lg:hidden">
        <button
          className={drawerButtonClass}
          onClick={() => setUpgradeDrawerOpen(!upgradeDrawerOpen)}
        >
          Upgrades
        </button>
        <button
          className={drawerButtonClass}
          onClick={() => setItemDrawerOpen(!itemDrawerOpen)}
        >
          Resources
        </button>
      </div>
      <div className="flex justify-around gap-5 lg:flex-row">
        <div className="hidden lg:flex">
          <UpgradeList />
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-yellow-200">Loading...</p>
          </div>
        ) : (
          <MainCoin />
        )}
        <div className="hidden lg:flex">
          <ItemList />
        </div>
      </div>

      <div className="lg:hidden">
        <Drawer
          isOpen={upgradeDrawerOpen}
          setIsOpen={setUpgradeDrawerOpen}
          side="left"
        >
          <UpgradeList />
        </Drawer>
      </div>

      <div className="lg:hidden">
        <Drawer
          isOpen={itemDrawerOpen}
          setIsOpen={setItemDrawerOpen}
          side="right"
        >
          <ItemList />
        </Drawer>
      </div>
    </div>
  )
}
