'use client'
import React from 'react'
import { ClickerProvider } from '@/features/clicker/useClickerContext'
import { MineSweeperProvider } from '../features/minesweeper/useSweeperContext'
import { ToastProvider } from './useToast'
import { SessionProvider } from 'next-auth/react'
import { MeProvider } from './useMe'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MeProvider>
        <ToastProvider>
          <ClickerProvider>
            <MineSweeperProvider>{children}</MineSweeperProvider>
          </ClickerProvider>
        </ToastProvider>
      </MeProvider>
    </SessionProvider>
  )
}
