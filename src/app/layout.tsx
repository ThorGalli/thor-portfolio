import './globals.css'
import type { Metadata } from 'next'
import { ProvidersWrapper } from '@/contexts/providersWrapper'
import ToastHolder from '@/components/toast/toastHolder'

export const metadata: Metadata = {
  title: 'Thor Galli',
  description: 'Portfolio + Clicker Game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>
          <ToastHolder />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  )
}
