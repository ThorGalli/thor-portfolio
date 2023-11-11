'use client'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { useSession } from 'next-auth/react'
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
      console.log(data)
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

  return (
    <>
      {loading && <p className="animate-spin text-4xl text-yellow-200">⚙</p>}

      {unauthenticated && (
        <button
          className="cursor-pointer text-yellow-200 hover:underline"
          onClick={() => router.push('/options')}
        >
          Sign in to see leaderboards
        </button>
      )}

      {isLeaderboardsReady ? (
        <div className="flex w-full flex-col items-center gap-2 overflow-hidden">
          <h1 className="text-yellow-400">Top {leaderboards.length} players</h1>
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
                return (
                  <tr key={'i' + i}>
                    <td
                      className={
                        'border border-slate-800 bg-slate-950 px-2 text-right ' +
                        leftBorder
                      }
                    >
                      {i + 1}
                    </td>
                    <td className={'border border-slate-800 bg-slate-950 px-2'}>
                      {leaderboard.users.name}
                    </td>
                    <td
                      className={
                        'border border-slate-800  bg-slate-950 px-2 text-right ' +
                        rightBorder
                      }
                    >
                      {short(leaderboard.income)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-yellow-200">We couldn&apos;t find leaderboards</p>
      )}
    </>
  )
}
