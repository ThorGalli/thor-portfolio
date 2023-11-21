import { ReactNode, forwardRef, useEffect, useRef, useState } from 'react'
import Leaderboards from './tabs/leaderboards'
import Options from './tabs/options'
import ResourceList from '@/components/shops/resourceList'
import UpgradeList from '@/components/shops/upgradeList'
import { clsx } from 'clsx'
import useWindowDimensions from '@/hooks/useWindowsDimensions'
import AchievementList from '@/components/shops/achievementList'

type Tab = {
  label: string
  emoji: string | React.ReactNode
  component: React.ReactNode
  extraClass: string
}

export default function ClickerNavBar() {
  const { width } = useWindowDimensions()

  const tabs: Tab[] = [
    {
      label: 'Resources',
      emoji: '💻',
      component: <ResourceList mobile />,
      extraClass: 'lg:hidden',
    },
    {
      label: 'Upgrades',
      emoji: '🔨',
      component: <UpgradeList mobile />,
      extraClass: 'lg:hidden',
    },
    {
      label: 'Achievements',
      emoji: '🏆',
      component: <AchievementList />,
      extraClass: '',
    },
    {
      label: 'Leaderboards',
      emoji: '📈',
      component: <Leaderboards />,
      extraClass: '',
    },
    {
      label: 'config',
      emoji: '💾',
      component: <Options />,
      extraClass: '',
    },
  ]

  const [selectedTab, setSelectedTab] = useState<number | null>(0)
  const [tabHeight, setTabHeight] = useState<number | null>(null)
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({})

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
  }, [width, tabs])

  return (
    <div className="relative flex w-full flex-col">
      <div className="flex w-full gap-[1px]">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => handleClickTab(index)}
            className={
              'btn-slate relative my-[1px] flex-grow flex-col items-center justify-center border-slate-600 p-2 ' +
              tab.extraClass
            }
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
        ))}
      </div>

      <div
        className="relative flex overflow-clip rounded-b-[14px] border-8 border-slate-800 bg-slate-800 duration-200"
        style={{ height: tabHeight ? tabHeight + 16 : 0 }}
      >
        {tabs.map((tab, index) => (
          <SliderWraper
            key={tab.label}
            index={index}
            extraClass={tab.extraClass}
            selectedTab={selectedTab}
            tabHeight={tabHeight}
          >
            <TabContent ref={(element) => (refs.current[index] = element)}>
              {tab.component}
            </TabContent>
          </SliderWraper>
        ))}
      </div>
    </div>
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
  extraClass,
  selectedTab,
  tabHeight,
  children,
}: {
  index: number
  extraClass: string
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
        extraClass,
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
