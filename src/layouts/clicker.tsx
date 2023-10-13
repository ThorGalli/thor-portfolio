'use client'
import React, { useState } from 'react'
import MainCoin from '@/components/coins/mainCoin'
import ItemList from '@/components/shops/itemList'
import UpgradeList from '@/components/shops/upgradeList'
import Drawer from '@/components/navigation/drawer'
import { useClickerContext } from '@/contexts/useClickerContext'

export default function ClickerGame() {
  const [upgradeDrawerOpen, setUpgradeDrawerOpen] = useState(false)
  const [itemDrawerOpen, setItemDrawerOpen] = useState(false)

  const { loading } = useClickerContext()

  return (
    <div className="relative flex flex-col gap-2">
      {/* Mobile Buttons */}
      <div className="flex justify-between lg:hidden">
        <button
          className="btn-yellow rounded-[14px] border-4 px-2 py-4"
          onClick={() => setUpgradeDrawerOpen(!upgradeDrawerOpen)}
        >
          Upgrades
        </button>
        <button
          className="btn-yellow rounded-[14px] border-4 px-2 py-4"
          onClick={() => setItemDrawerOpen(!itemDrawerOpen)}
        >
          Resources
        </button>
      </div>
      {/*  */}

      {/* Main Layout */}
      <div className="flex justify-around">
        <div className="absolute left-0 hidden lg:flex">
          <UpgradeList />
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-yellow-200">Loading...</p>
          </div>
        ) : (
          <MainCoin />
        )}
        <div className="absolute right-0 hidden lg:flex">
          <ItemList />
        </div>
      </div>
      {/*  */}

      {/* Mobile Layout */}
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
      {/*  */}
    </div>
  )
}
