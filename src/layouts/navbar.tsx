'use client'
import ClickerButton from '@/components/navigation/clickerButton'
import NavButton from '@/components/navigation/navButton'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const path = usePathname()
  const { status, data } = useSession()

  function getOptionsLabel() {
    switch (status) {
      case 'authenticated':
        return <p className="text-2xl">👨‍💼</p>
      case 'loading':
        return <p className="animate-spin text-2xl">⚙️</p>
      default:
        return <p>Sign in</p>
    }
  }
  return (
    <div className="relative mb-[3.5rem] w-full bg-gray-900 lg:mb-0 lg:mt-[3.5rem]">
      <div
        id="navbar-wrapper"
        className="fixed bottom-0 z-10 flex h-fit w-full justify-center bg-slate-800 lg:top-0"
      >
        <div className="flex h-[3.5rem] w-screen max-w-screen-2xl flex-row justify-center">
          <NavButton
            label={<p className="text-2xl">🏠</p>}
            isCurrent={path === '/'}
            onClick={() => router.push('/')}
          />
          <ClickerButton
            label={<p className="text-2xl">👆</p>}
            onClick={() => router.push('/clicker')}
            isCurrent={path === '/clicker'}
          />
          <NavButton
            label={<p className="text-2xl">💣</p>}
            isCurrent={path === '/minesweeper'}
            onClick={() => router.push('/minesweeper')}
          />
          <NavButton
            onClick={() => router.push('/options')}
            isCurrent={path === '/options'}
            label={getOptionsLabel()}
          />
        </div>
      </div>
      <div
        id="content-wrapper"
        className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-screen-2xl bg-slate-900 p-2 shadow-[0_0_30px_10px] shadow-slate-950"
      >
        {children}
      </div>
    </div>
  )
}
