import { useState } from 'react'
import Leaderboards from './leaderboards'
import SaveGameButton from '@/components/settings/saveGameButton'

type Tab = {
  [key: string]: {
    label: string
    emoji: string
    component: React.ReactNode
  }
}
export default function ClickerNavBar() {
  const [selectedTab, setSelectedTab] = useState<string | null>('leaderboards')

  const tabs: Tab = {
    leaderboards: {
      label: 'Leaderboards',
      emoji: '📈',
      component: <Leaderboards />,
    },
    config: {
      label: 'config',
      emoji: '⚙️',
      component: <SaveGameButton />,
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
      <div className="z-10 flex w-full gap-[1px]">
        {Object.entries(tabs).map(([name, { label, emoji }]) => (
          <button
            key={name}
            onClick={() => handleClickTab(name)}
            className={
              'my-[1px] flex flex-grow flex-col items-center justify-center border-slate-600 p-2 ' +
              (selectedTab === name ? 'btn-yellow ' : 'btn-slate ')
            }
          >
            <p>{emoji}</p>
          </button>
        ))}
      </div>
      <div className="rounded-b-[14px] border-8 border-slate-800 bg-slate-800">
        {selectedTab ? (
          <div className="flex flex-col items-center">
            {tabs[selectedTab].component}
          </div>
        ) : null}
      </div>
    </div>
  )
}
