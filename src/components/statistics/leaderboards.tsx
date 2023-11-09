'use client'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Leaderboards() {
  const [leaderboards, setLeaderboards] = useState<any>([])
  const { status } = useSession()
  const [loading, setLoading] = useState(false)

  const { short } = useClickerCalculations()
  const router = useRouter()
  async function loadLeaderboards() {
    if (status !== 'authenticated') return
    try {
      setLoading(true)
      const response = await fetch('/api/users/leaderBoards', { method: 'GET' })
      const { data } = await response.json()
      if (!data) return
      setLeaderboards(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLeaderboards()
    const interalId = setInterval(() => {
      loadLeaderboards()
    }, 300000)
    return () => {
      clearInterval(interalId)
    }
  }, [status])

  function getComponent() {
    if (status === 'loading' || loading)
      return <p className="animate-spin text-4xl text-yellow-200">⚙</p>
    if (status === 'unauthenticated')
      return (
        <p
          className="cursor-pointer text-yellow-200 hover:underline"
          onClick={() => router.push('/options')}
        >
          Sign in to see leaderboards
        </p>
      )
    if (leaderboards.length > 0) {
      return (
        <div className="flex flex-col items-center gap-2 overflow-hidden rounded-[14px] border-8 border-slate-800 bg-slate-800">
          <h1 className="text-yellow-400">Top {leaderboards.length} players</h1>
          <table className="table-auto">
            <thead className="text-yellow-200">
              <tr>
                <th className="rounded-tl-md border border-slate-800 bg-slate-700 px-2">
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
                        'border border-slate-800 bg-slate-950 px-2 ' +
                        leftBorder
                      }
                    >
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
      )
    } else {
      return (
        <p className="text-yellow-200">We couldn&apos;t find leaderboards</p>
      )
    }
  }
  return getComponent()
}
