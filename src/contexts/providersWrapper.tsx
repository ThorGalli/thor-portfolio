'use client'
import React from 'react'
import { ClickerProvider } from '@/features/clicker/useClickerContext'
import { MineSweeperProvider } from '../features/minesweeper/useSweeperContext'
import { ToastProvider } from './useToast'
import { SessionProvider } from 'next-auth/react'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClickerProvider>
        <ToastProvider>
          <MineSweeperProvider>{children}</MineSweeperProvider>
        </ToastProvider>
      </ClickerProvider>
    </SessionProvider>
  )
}
