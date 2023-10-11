'use client'
import React, { useState } from 'react'
import MainCoin from '@/components/coins/mainCoin'
import ItemList from '@/components/shops/itemList'
import UpgradeList from '@/components/shops/upgradeList'
import Drawer from '@/components/navigation/drawer'

export default function ClickerGame() {
  const [upgradeDrawerOpen, setUpgradeDrawerOpen] = useState(false)
  const [itemDrawerOpen, setItemDrawerOpen] = useState(false)
  const drawerButtonClass =
    'h-fit rounded-md border-2 border-yellow-800 px-2 py-4 text-yellow-200 lg:hidden'

  return (
    <div>
      <div className="flex justify-around gap-5 lg:flex-row">
        <button
          className={drawerButtonClass}
          onClick={() => setUpgradeDrawerOpen(!upgradeDrawerOpen)}
        >
          Upgrades
        </button>
        <div className="hidden flex-col gap-2 lg:flex">
          <p className="h-fit rounded-md border-2 border-yellow-800 px-2 py-4 text-yellow-200">
            Upgrades
          </p>
          <UpgradeList />
        </div>
        <MainCoin />
        <div className="hidden flex-col gap-2 lg:flex">
          <p className="h-fit rounded-md border-2 border-yellow-800 px-2 py-4 text-yellow-200">
            Resources
          </p>
          <ItemList />
        </div>
        <button
          className={drawerButtonClass}
          onClick={() => setItemDrawerOpen(!itemDrawerOpen)}
        >
          Resources
        </button>
      </div>

      <div className="lg:hidden">
        <Drawer
          isOpen={upgradeDrawerOpen}
          setIsOpen={setUpgradeDrawerOpen}
          side="left"
          title="Upgrades"
        >
          <UpgradeList />
        </Drawer>
      </div>

      <div className="lg:hidden">
        <Drawer
          isOpen={itemDrawerOpen}
          setIsOpen={setItemDrawerOpen}
          side="right"
          title="Resources"
        >
          <ItemList />
        </Drawer>
      </div>
    </div>
  )
}
