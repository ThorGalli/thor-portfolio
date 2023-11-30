'use client'
import ConfirmationDialog from '@/components/settings/confirmationDialog'
import { useMe } from '@/contexts/useMe'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { useDisclosure } from '@/hooks/useDisclosure'
import NavbarLayout from '@/layouts/navbar'
import clsx from 'clsx'
import { table } from 'console'
import { useRouter } from 'next/navigation'
import { ReactNode, forwardRef, useEffect, useRef, useState } from 'react'

type Tab = {
  label: string
  emoji: string | React.ReactNode
  component: React.ReactNode
}

export default function Admin() {
  const { me, showAdmin } = useMe()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(100)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [targetUser, setTargetUser] = useState<{
    name: string
    isAdmin: boolean
  } | null>(null)

  const changeRoleDialog = useDisclosure()
  const resetDataDialog = useDisclosure()

  const [selectedTab, setSelectedTab] = useState<number | null>(0)
  const [tabHeight, setTabHeight] = useState<number | null>(null)
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const from = (page - 1) * limit
  const to = page * limit - 1
  const router = useRouter()
  const isUsersDataReady = users.length > 0

  const { short } = useClickerCalculations()

  function handleChangeRole(user: any) {
    console.log('handleChangeRole', user)
    setTargetUser(user)
    changeRoleDialog.onOpen()
  }

  async function changeRole(user: any) {
    setLoading(true)
    const res = await fetch(`/api/admin/changeRole`, {
      method: 'POST',
      body: JSON.stringify({ id: user.id, newRole: !user.isAdmin }),
    })
    const jsonData = await res.json()
    if (jsonData?.status === 201) {
      fetchAllUsers()
      setTargetUser(null)
    }
    changeRoleDialog.onClose()
    setLoading(false)
  }

  function handleResetData(user: any) {
    setTargetUser(user)
    resetDataDialog.onOpen()
  }

  async function resetSaveData(user: any) {
    setLoading(true)
    const res = await fetch(`/api/admin/resetSaveData`, {
      method: 'POST',
      body: JSON.stringify({ id: user.id }),
    })
    const jsonData = await res.json()
    if (jsonData?.status === 201) {
      fetchAllUsers()
      setTargetUser(null)
    }
    resetDataDialog.onClose()
    setLoading(false)
  }

  async function fetchAllUsers() {
    const res = await fetch(`/api/admin/allUsers?from=${from}&to=${to}`, {
      method: 'GET',
    })
    const jsonData = await res.json()
    console.log(jsonData)
    if (jsonData?.data?.length > 0) {
      const organizedData = jsonData.data.map((node: any) => {
        return {
          id: node.users.id,
          name: node.users.name,
          image: node.users.image,
          income: node.income,
          isAdmin: node.users.admin,
          saveData: node.clicker_state,
          achievementsUnlocked: Object.values(
            node.clicker_state.achievements ?? {},
          ).filter((achiev: any) => achiev.unlocked).length,
          createdAt: new Date(node.created_at),
        }
      })
      setUsers(organizedData)
    }
  }

  const usersTable = (
    <table className="w-full table-auto overflow-hidden rounded-md border">
      <thead className="text-yellow-200">
        <tr>
          <th className="rounded-tl-md border border-slate-800 bg-slate-700 px-2"></th>
          <th className="border border-slate-800 bg-slate-700 px-2">Name</th>
          <th className="border border-slate-800 bg-slate-700 px-2">Income</th>
          <th className="border border-slate-800 bg-slate-700 px-2">Achievs</th>
          <th className="border border-slate-800 bg-slate-700 px-2">
            Plays Since
          </th>
          <th className="rounded-tr-md border border-slate-800 bg-slate-700 px-2">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="gap-4">
        {users.map((user: any, i: number, arr: any[]) => {
          const isLast = i === arr.length - 1
          const leftBorder = isLast ? 'rounded-bl-md' : ''
          const rightBorder = isLast ? 'rounded-br-md' : ''
          return (
            <tr key={user.id}>
              <td
                className={
                  'border border-slate-800 bg-slate-950 px-2 text-right ' +
                  leftBorder
                }
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-10 w-10 rounded-md p-1"
                />
              </td>
              <td className={'border border-slate-800 bg-slate-950 px-2'}>
                {user.name}
              </td>
              <td className={'border border-slate-800 bg-slate-950 px-2'}>
                {short(user.income)}
              </td>
              <td className={'border border-slate-800 bg-slate-950 px-2'}>
                {user.achievementsUnlocked}🏆
              </td>
              <td
                className={
                  'border border-slate-800  bg-slate-950 px-2 text-right ' +
                  rightBorder
                }
              >
                {user.createdAt.toLocaleDateString()}
              </td>
              <td
                className={
                  'border border-slate-800  bg-slate-950 px-2 text-right ' +
                  rightBorder
                }
              >
                <div className="flex justify-evenly">
                  <button
                    onClick={() => handleChangeRole(user)}
                    disabled={loading}
                    className={loading ? 'animate-spin' : ''}
                  >
                    {user.isAdmin ? '👽' : '😁'}
                  </button>
                  <button
                    onClick={() => handleResetData(user)}
                    disabled={loading}
                    className={loading ? 'animate-spin' : ''}
                  >
                    ♻️
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )

  const achievementsBarChart = (
    <div className="flex flex-col items-center gap-4">
      <h1 className="header-slate w-full">Bar Chart</h1>
      <div className="flex w-full flex-col items-center gap-2 rounded-md bg-slate-950 p-2">
        <div className="flex w-full items-end gap-2 rounded-md bg-slate-950 p-2">
          <p className="h-4 w-4 -rotate-90 pl-4 text-left text-sm">Users</p>
          <div></div>
          <div id="scale"></div>
          {groupByAchievementCount(users).map(([key, value]) => {
            return (
              <div
                key={'barg-' + key}
                className={
                  'relative flex w-1/4 flex-col justify-end bg-slate-950 pb-4'
                }
              >
                <p>
                  {value} ({Math.round((value / users.length) * 100)}%)
                </p>
                <div
                  className="rounded-t-sm bg-yellow-400"
                  style={{ height: value * 50 }}
                />
                {/* under tbar */}
                <p className="absolute -bottom-2 w-full text-center text-sm">
                  {key}
                </p>
              </div>
            )
          })}
        </div>
        <div>Achievements Unlocked</div>
      </div>
    </div>
  )

  const tabs: Tab[] = [
    {
      label: 'Users',
      emoji: '👥',
      component: usersTable,
    },
    {
      label: 'Users2',
      emoji: '🏆',
      component: achievementsBarChart,
    },
  ]

  useEffect(() => {
    if (!showAdmin) return
    fetchAllUsers()
  }, [showAdmin])

  useEffect(() => {
    if (selectedTab === null) {
      setTabHeight(0)
    }

    if (selectedTab !== null) {
      const tabElement = refs.current[selectedTab]
      if (tabElement) {
        setTabHeight(tabElement.offsetHeight)
      }
    }
  }, [tabs])

  if (!showAdmin) {
    return (
      <NavbarLayout>
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-md bg-orange-950 py-24">
          <h1 className="w-full text-center text-4xl font-bold">
            🚨 ACCESSIS DENIEDIS 🚨
          </h1>
          <p className="text-xl">This page is only accessible to admins.</p>
          <button
            className="btn-orange rounded-md p-4 text-4xl"
            onClick={() => router.push('/')}
          >
            Go back
          </button>
        </div>
      </NavbarLayout>
    )
  }

  function handleClickTab(index: number) {
    if (selectedTab === index) {
      setSelectedTab(null)
      setTabHeight(0)
      return
    }
    const tabElement = refs.current[index]

    if (tabElement) {
      setTabHeight(tabElement.offsetHeight)
      setSelectedTab(index)
    }
  }

  return (
    <NavbarLayout>
      <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center">
        <h1 className="w-full select-none rounded-t-lg bg-slate-700 py-1 text-center text-4xl font-bold">
          Admin View
        </h1>

        <div className="flex w-full items-center gap-[1px]">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => handleClickTab(index)}
              className="btn-slate relative my-[1px] flex-grow flex-col items-center justify-center border-slate-600 p-2"
            >
              <div
                className={
                  'absolute bottom-0 h-1 w-full ' +
                  (selectedTab === index && ' bg-yellow-700 ') +
                  (selectedTab !== index && ' bg-stone-700 ')
                }
              />
              <p className="text-2xl">{tab.emoji}</p>
            </button>
          ))}{' '}
        </div>
        <div
          className="relative flex w-full overflow-clip rounded-b-[14px] border-8 border-slate-800 bg-slate-800 duration-200"
          style={{ height: tabHeight ? tabHeight + 16 : 0 }}
        >
          {tabs.map((tab, index) => (
            <SliderWraper
              key={tab.label}
              index={index}
              selectedTab={selectedTab}
              tabHeight={tabHeight}
            >
              <TabContent ref={(element) => (refs.current[index] = element)}>
                {isUsersDataReady && tab.component}
              </TabContent>
            </SliderWraper>
          ))}
        </div>
      </div>
      <ConfirmationDialog
        isOpen={changeRoleDialog.isOpen}
        onCancel={changeRoleDialog.onClose}
        onConfirm={() => changeRole(targetUser)}
        confirmQuestion={`Are you sure you want to make ${
          targetUser?.name ?? 'user'
        } ${targetUser?.isAdmin ? 'a normal user' : 'an admin'}?`}
        confirmAnswer="Change role"
      />
      <ConfirmationDialog
        isOpen={resetDataDialog.isOpen}
        onCancel={resetDataDialog.onClose}
        onConfirm={() => resetSaveData(targetUser)}
        confirmQuestion={`Are you sure you want to DELETE ALL of ${
          targetUser?.name ?? 'user'
        }'s data?`}
        confirmAnswer="DELETE"
      />
    </NavbarLayout>
  )
}

const TabContent = forwardRef<HTMLDivElement, { children: ReactNode }>(
  (props, ref) => {
    return (
      <div className="relative w-full" ref={ref}>
        {props.children}
      </div>
    )
  },
)

function SliderWraper({
  index,
  selectedTab,
  tabHeight,
  children,
}: {
  index: number
  children: ReactNode
  selectedTab: number | null
  tabHeight: number | null
}) {
  const show = selectedTab === index
  const isPrevious = selectedTab !== null && selectedTab < index
  const isNext = selectedTab !== null && selectedTab > index
  return (
    <div
      className={clsx(
        'absolute w-full transform duration-200',
        selectedTab === null ? 'opacity-0' : '',
        show && 'transform-none opacity-100',
        isPrevious && 'translate-x-12 opacity-0',
        isNext && '-translate-x-12 opacity-0',
      )}
      style={{
        height: tabHeight ? tabHeight + 16 : 0,
        pointerEvents: selectedTab === index ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}

TabContent.displayName = 'TabContent'

function groupByAchievementCount(users: any[]) {
  const groupedUsers: { [key: number]: number } = {}

  users.forEach((user: any) => {
    const count: number = user.achievementsUnlocked
    if (!groupedUsers[count]) groupedUsers[count] = 1
    else groupedUsers[count]++
  })
  return Object.entries(groupedUsers)
}
