'use client'
import React from 'react'
import MainCoin from '@/components/coins/mainCoin'
import ItemList from '@/components/shops/itemList'
import UpgradeList from '@/components/shops/upgradeList'
import Drawer from '@/components/navigation/drawer'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { useUrlDisclosure } from '@/hooks/useUrlDisclosure'

export default function ClickerGame() {
  const itemDrawer = useUrlDisclosure('itemDrawer')
  const upgradeDrawer = useUrlDisclosure('upgradeDrawer')

  const { loading } = useClickerContext()

  return (
    <div className="relative flex flex-col gap-2">
      {/* Mobile Buttons */}
      <div className="flex justify-between lg:hidden">
        <button
          className="btn-yellow rounded-md px-4 py-4"
          onClick={() => upgradeDrawer.onOpen()}
        >
          Upgrades
        </button>
        <button
          className="btn-yellow rounded-md px-4 py-4"
          onClick={() => itemDrawer.onOpen()}
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
          isOpen={upgradeDrawer.isOpen}
          onClose={upgradeDrawer.onClose}
          side="left"
        >
          <UpgradeList />
        </Drawer>
      </div>

      <div className="lg:hidden">
        <Drawer
          isOpen={itemDrawer.isOpen}
          onClose={itemDrawer.onClose}
          side="right"
        >
          <ItemList />
        </Drawer>
      </div>
      {/*  */}
    </div>
  )
}
