'use client'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import BaseCoin from '../../../components/coins/baseCoins'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import { useEffect, useState } from 'react'
import useTwoStagesAnimation from '@/hooks/useTwoStagesAnimation'

export default function MainCoin() {
  const {
    resourceIncome,
    autoIncome,
    totalCoins,
    clicksIncome,
    onClickCoin,
    clicks,
  } = useClickerContext()
  const { short } = useClickerCalculations()

  function handleClick() {
    onClickCoin()
  }
  const [isOpen, setIsOpen] = useState(false)
  const clicksTooFew = clicks < 10
  const [showTutorial, setShowTutorial] = useState(clicksTooFew)
  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  const { animateClose, showContent, styles } = useTwoStagesAnimation({
    animStyles: {
      tutorialStyles: {
        inactive: { opacity: 0, maxHeight: 0, marginBottom: 0 },
        active: { opacity: 1, maxHeight: 20, marginBottom: '0.5rem' },
      },
    },
    durationInMs: 1000,
    isActive: showTutorial,
  })

  useEffect(() => {
    if (!clicksTooFew) {
      animateClose(() => setShowTutorial(false))
      return
    }
    setShowTutorial(true)
  }, [clicksTooFew])

  const totalIncome =
    Math.round((resourceIncome + autoIncome + clicksIncome) * 100) / 100

  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-t-[14px] bg-slate-800 p-2">
      <div className="flex w-full flex-col items-center justify-start gap-2 rounded-md bg-slate-950 pb-2 lg:w-full">
        <button
          id="info_wrapper"
          className="w-full cursor-pointer rounded-t-md bg-slate-700 p-2"
          onClick={toggleAccordion}
        >
          <div id="main_info" className="flex w-full justify-center">
            <div className="flex w-full justify-between text-yellow-200">
              <p>{isOpen ? '[-]' : '[+]'} Income:</p>{' '}
              <p>+{short(totalIncome, 2)}/s</p>
            </div>
          </div>
          <section
            className={`transition-max-h ease-in-oute- h-fit overflow-hidden duration-300 ${
              isOpen ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <div className="mt-1 flex w-full justify-between border-t border-slate-500">
              <p>&nbsp;L Resources:&nbsp;</p>
              <p>+{short(resourceIncome, 2)}/s</p>
            </div>
            <div className="flex w-full justify-between">
              <p>&nbsp;L Clicker Bots:&nbsp;</p>
              <p>+{short(autoIncome, 2)}/s</p>
            </div>
            <div className="flex w-full justify-between">
              <p>&nbsp;L Clicks:&nbsp;</p>
              <p>+{short(clicksIncome, 2)}/s</p>
            </div>
          </section>
        </button>

        <div className="flex flex-col items-center">
          {showTutorial && (
            <p style={styles.tutorialStyles}>
              <span className="text-yellow-400">Click</span> the Coin to earn
              coins!
            </p>
          )}
          <button
            id="coin"
            onClick={handleClick}
            style={{ transition: 'all 0.1s ease-in-out' }}
            className="mt-2 cursor-pointer overflow-hidden rounded-full transition-all hover:scale-110 active:scale-95"
          >
            <BaseCoin />
          </button>
        </div>

        <p className="text-2xl text-slate-400">
          Total Coins:{' '}
          <span className="font-bold text-yellow-200">
            {short(totalCoins, 2)}
          </span>
        </p>
      </div>
    </div>
  )
}
