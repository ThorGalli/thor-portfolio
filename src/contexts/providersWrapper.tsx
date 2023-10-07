'use client'
import React from 'react'
import { GameProvider } from '@/contexts/useGameContext'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>
}
