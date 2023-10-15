'use client'
import React from 'react'
import { ClickerProvider } from '@/contexts/useClickerContext'
import { MineSweeperProvider } from './useSweeperContext'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClickerProvider>
      <MineSweeperProvider>{children}</MineSweeperProvider>
    </ClickerProvider>
  )
}
