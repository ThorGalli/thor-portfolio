'use client'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Leaderboards() {
  const router = useRouter()
  const { status } = useSession()
  const { short } = useClickerCalculations()

  const [leaderboards, setLeaderboards] = useState<unknown[]>([])
  const [loadingLeaderboards, setLoadingLeaderboards] = useState(false)

  const loading = status === 'loading' || loadingLeaderboards
  const unauthenticated = status === 'unauthenticated'
  const isLeaderboardsReady = leaderboards.length > 0

  async function loadLeaderboards() {
    if (status !== 'authenticated') return
    try {
      setLoadingLeaderboards(true)
      const response = await fetch('/api/users/leaderBoards', {
        method: 'GET',
        next: { revalidate: 120 },
      })
      const { data } = await response.json()
      if (!data) return
      setLeaderboards(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingLeaderboards(false)
    }
  }

  useEffect(() => {
    loadLeaderboards()
    const interalId = setInterval(() => {
      loadLeaderboards()
    }, 120000)
    return () => {
      clearInterval(interalId)
    }
  }, [status])

  if (loading)
    return <p className="animate-spin text-4xl text-yellow-200">⚙</p>

  if (unauthenticated)
    return (
      <div className="flex flex-col items-center gap-2">
        <h1 className="header-slate w-full">Leaderboards</h1>
        <p className="text-yellow-200">
          You need to be signed in to see leaderboards
        </p>
        <button className="btn-yellow rounded-md p-2" onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    )

  function getColor(i: number) {
    if (i === 0) return 'text-yellow-400'
    if (i === 1) return 'text-white'
    if (i === 2) return 'text-orange-300'
    return 'text-slate-300'
  }

  if (isLeaderboardsReady)
    return (
      <div className="flex flex-col items-center gap-2 overflow-hidden">
        <h1 className="header-slate w-full">Leaderboards</h1>
        <table className="w-full table-auto">
          <thead className="text-yellow-200">
            <tr>
              <th className="rounded-tl-md border border-slate-800 bg-slate-700 px-2">
                Rank
              </th>
              <th className="border border-slate-800 bg-slate-700 px-2">
                Username
              </th>
              <th className="rounded-tr-md border border-slate-800 bg-slate-700 px-2">
                Income
              </th>
            </tr>
          </thead>
          <tbody className="gap-4">
            {leaderboards.map((leaderboard: any, i: number, arr: any[]) => {
              const isLast = i === arr.length - 1
              const leftBorder = isLast ? 'rounded-bl-md' : ''
              const rightBorder = isLast ? 'rounded-br-md' : ''
              const color = getColor(i)
              return (
                <tr key={'i' + i}>
                  <td
                    className={
                      'border border-slate-800 bg-slate-950 px-2 text-right ' +
                      leftBorder
                    }
                  >
                    <p className={color}>{i + 1}</p>
                  </td>
                  <td className={'border border-slate-800 bg-slate-950 px-2'}>
                    <p className={color}>{leaderboard.users.name}</p>
                  </td>
                  <td
                    className={
                      'border border-slate-800  bg-slate-950 px-2 text-right ' +
                      rightBorder
                    }
                  >
                    <p className={color}>{short(leaderboard.income)}</p>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )

  return <p className="text-yellow-200">We couldn&apos;t find leaderboards</p>
}
