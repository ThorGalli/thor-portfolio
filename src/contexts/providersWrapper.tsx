'use client'
import React from 'react'
import { ClickerProvider } from '@/contexts/useClickerContext'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <ClickerProvider>{children}</ClickerProvider>
}
