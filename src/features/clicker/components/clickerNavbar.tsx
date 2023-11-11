import { useState } from 'react'
import Leaderboards from './tabs/leaderboards'
import SaveGameButton from '@/components/settings/saveGameButton'
import { useSession } from 'next-auth/react'
import Options from './tabs/options'
import ResourceList from '@/components/shops/resourceList'
import UpgradeList from '@/components/shops/upgradeList'

type Tab = {
  [key: string]: {
    label: string
    emoji: string | React.ReactNode
    component: React.ReactNode
  }
}
export default function ClickerNavBar() {
  const [selectedTab, setSelectedTab] = useState<string | null>('resources')
  const { status } = useSession()

  function getOptionsLabel() {
    switch (status) {
      case 'authenticated':
        return '⚙️'
      case 'loading':
        return <span className="animate-spin">⚙️</span>
      default:
        return <span className="text-yellow-200">Sign in</span>
    }
  }

  const tabs: Tab = {
    resources: {
      label: 'Resources',
      emoji: '💻',
      component: <ResourceList tight />,
    },
    upgrades: {
      label: 'Upgrades',
      emoji: '🔨',
      component: <UpgradeList tight />,
    },
    leaderboards: {
      label: 'Leaderboards',
      emoji: '📈',
      component: <Leaderboards />,
    },
    config: {
      label: 'config',
      emoji: getOptionsLabel(),
      component: <Options />,
    },
  }

  function handleClickTab(name: string) {
    if (selectedTab === name) {
      setSelectedTab(null)
      return
    }
    setSelectedTab(name)
  }

  return (
    <div className="relative flex w-full flex-col">
      <div className="flex w-full gap-[1px]">
        {Object.entries(tabs).map(([name, { label, emoji }]) => (
          <button
            key={name}
            onClick={() => handleClickTab(name)}
            className="btn-slate btn-slate relative my-[1px] flex flex-grow flex-col items-center justify-center border-slate-600 p-2"
          >
            <div
              className={
                'absolute bottom-0 h-1 w-full ' +
                (selectedTab === name && ' bg-yellow-700 ') +
                (selectedTab !== null &&
                  selectedTab !== name &&
                  ' bg-stone-700 ')
              }
            />
            <p className="text-2xl">{emoji}</p>
          </button>
        ))}
      </div>
      <div className="rounded-b-[14px] border-8 border-slate-800 bg-slate-800 duration-200">
        {Object.entries(tabs).map(([name, { component }]) => (
          <div
            key={name}
            className={
              'flex flex-col items-center justify-center gap-2 ' +
              ((selectedTab === name && ' ') || ' hidden ')
            }
          >
            {component}
          </div>
        ))}
      </div>
    </div>
  )
}
