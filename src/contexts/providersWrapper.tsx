'use client'
import React from 'react'
import { ClickerProvider } from '@/features/clicker/useClickerContext'
import { MineSweeperProvider } from '../features/minesweeper/useSweeperContext'
import { ToastProvider } from './useToast'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClickerProvider>
      <ToastProvider>
        <MineSweeperProvider>{children}</MineSweeperProvider>
      </ToastProvider>
    </ClickerProvider>
  )
}
