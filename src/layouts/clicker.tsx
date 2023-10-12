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
        <div className="hidden flex-col gap-2 lg:flex">
          <p className="h-fit rounded-[14px] border-8 border-slate-800 bg-slate-950 px-2 py-4 text-center text-yellow-200">
            Upgrades
          </p>
          <UpgradeList />
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-yellow-200">Loading...</p>
          </div>
        ) : (
          <MainCoin />
        )}
        <div className="hidden flex-col gap-2 lg:flex">
          <p className="h-fit rounded-[14px] border-8 border-slate-800 bg-slate-950 px-2 py-4 text-center text-yellow-200">
            Resources
          </p>
          <ItemList />
        </div>
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
