'use client'
import { useGameContext } from '@/contexts/useGameContext'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { useRouter, usePathname } from 'next/navigation'
export default function NavButton({
  route,
  label,
}: {
  route: string
  label: string
}) {
  const router = useRouter()
  const path = usePathname()

  const { totalCoins } = useGameContext()
  const { short } = useClickerCalculations()
  const isClicker = route === '/clicker'
  const isCurrent = path === route

  const buttonClasses = isCurrent
    ? 'border-t-transparent border-b-yellow-700 text-yellow-100 font-semibold'
    : 'border-transparent hover:bg-slate-700'

  return (
    <div
      className={
        'flex h-full flex-1 cursor-pointer flex-col items-center justify-center border-y-4 bg-slate-800 px-1 text-center text-lg hover:bg-slate-700 ' +
        buttonClasses
      }
      onClick={() => router.push(route)}
    >
      {label}
      {isClicker && <div>{short(totalCoins)}</div>}
    </div>
  )
}
