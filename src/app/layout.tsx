import './globals.css'
import type { Metadata } from 'next'
import { ProvidersWrapper } from '@/contexts/providersWrapper'
import ToastHolder from '@/components/toast/toastHolder'

export const metadata: Metadata = {
  title: 'Thor Galli - Full Stack Developer React, Java, Node.js, Typescript',
  description: `Thor Galli's Portfolio. Full Stack Developer. ReactJS, Java, Node.js, Typescript. Games: Clicker and Minesweeper`,
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
