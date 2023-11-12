'use client'
import React from 'react'
import MainCoin from '@/features/clicker/components/mainCoin'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import ClickerNavbar from './components/clickerNavbar'
import ResourceList from '@/components/shops/resourceList'
import UpgradeList from '@/components/shops/upgradeList'

export default function ClickerGame() {
  const { loading } = useClickerContext()

  return (
    <div className="relative flex flex-col gap-2">
      {/* Main Layout */}
      <div className="flex justify-around">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-yellow-200">Loading...</p>
          </div>
        ) : (
          <div className="flex w-full gap-2">
            <UpgradeList />
            <div className="flex w-full flex-col items-center">
              <MainCoin />
              <ClickerNavbar />
            </div>
            <ResourceList />
          </div>
        )}
      </div>
    </div>
  )
}
