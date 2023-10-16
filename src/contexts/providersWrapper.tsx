'use client'
import React from 'react'
import { ClickerProvider } from '@/contexts/useClickerContext'
import { MineSweeperProvider } from './useSweeperContext'
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
