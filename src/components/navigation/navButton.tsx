'use client'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { useRouter, usePathname } from 'next/navigation'
export default function NavButton({
  route,
  label,
}: {
  route: string
  label: string | JSX.Element
}) {
  const router = useRouter()
  const path = usePathname()

  const { totalCoins } = useClickerContext()
  const { short } = useClickerCalculations()
  const isClicker = route === '/clicker'
  const isCurrent = path === route

  const buttonClasses = isCurrent
    ? 'lg:border-b-yellow-700 border-t-yellow-700 text-yellow-100 font-semibold'
    : 'lg:border-b-stone-700 border-t-stone-700 hover:bg-slate-700'

  return (
    <div
      className={
        'flex h-full flex-1 cursor-pointer items-center justify-center gap-1 border-y-4 border-transparent bg-slate-800 px-1 text-center text-lg hover:bg-slate-700 lg:border-t-transparent ' +
        buttonClasses
      }
      onClick={() => router.push(route)}
    >
      {label}
      {isClicker && (
        <div className="text-sm lg:text-lg">{short(totalCoins)}</div>
      )}
    </div>
  )
}
