import { useClickerContext } from '@/features/clicker/useClickerContext'
import React, { useEffect, useState } from 'react'
import BaseCoin from '../coins/baseCoins'
import { Item, Upgrade } from '@/features/clicker/clickerTypes'
import Tooltip from './tooltip'
import useClickerCalculations from '@/features/clicker/hooks/useClickerCalculations'
import {
  getAmountAndProgress,
  getIncome,
  getIncomePerAmount,
  getTier,
} from '@/features/clicker/data/items'
import { BuyAmount } from './resourceList'
import useTwoStagesAnimation from '@/hooks/useTwoStagesAnimation'
import { getUpgradeValue, isCompleted } from '@/features/clicker/data/upgrades'

const ANIMATION_DURATION = 500

export default function BuyableBar({
  buyable,
  selectedAmount = BuyAmount.ONE,
}: {
  buyable: Item | Upgrade
  selectedAmount?: BuyAmount
}) {
  const {
    getAdjustedPrice: getAdjustedItemPrice,
    totalCoins,
    buy,
  } = useClickerContext()
  const { short } = useClickerCalculations()
  const [isHovered, setIsHovered] = useState(false)
  const [showToolTip, setShowToolTip] = useState(false)
  const { items, resourceIncomeMultiplier } = useClickerContext()

  const { animateClose, styles } = useTwoStagesAnimation({
    isActive: showToolTip,
    animStyles: {
      tooltip: {
        inactive: { opacity: 0, maxHeight: 0 },
        active: { opacity: 1, maxHeight: 1000 },
      },
    },
    durationInMs: ANIMATION_DURATION,
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isHovered) setShowToolTip(true)
    }, ANIMATION_DURATION)
    if (!isHovered) {
      animateClose(() => setShowToolTip(false))
      clearTimeout(timeout)
    }
    return () => clearTimeout(timeout)
  }, [isHovered])

  const isItem = 'income' in buyable
  const isUpgrade = 'multiplier' in buyable

  const hasAny = buyable.amount > 0
  const showItem = hasAny && isItem
  const showUpgrade = hasAny && isUpgrade

  const progress = showItem ? getAmountAndProgress(buyable) : null
  const adjustedPrice = getAdjustedItemPrice(buyable, getBuyAmount())
  const tier = showItem && buyable.amount > 0 ? getTier(buyable) : 0

  const isDisabled =
    totalCoins < adjustedPrice || (isUpgrade && isCompleted(buyable))

  function getBuyAmount(): number {
    switch (selectedAmount) {
      case BuyAmount.ONE:
        return 1
      case BuyAmount.TEN:
        return 10
      case BuyAmount.QUARTER:
        return 25
      case BuyAmount.NEXT:
        if (!progress) return 1
        return progress?.next - progress?.current
    }
  }

  return (
    <div
      className={'relative flex flex-col items-center '}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onContextMenu={(e) => {
        e.preventDefault()
        setShowToolTip(true)
      }}
    >
      <button
        onClick={() => buy(buyable, getBuyAmount())}
        className={
          'btn-yellow flex w-full flex-col gap-1 rounded-[6px] p-2 text-left transition-all duration-200'
        }
        disabled={isDisabled}
        onContextMenu={(e) => {
          e.preventDefault()
          setShowToolTip(true)
        }}
      >
        <div className="flex  justify-between ">
          {/* left */}
          <div className="flex flex-col justify-between leading-tight">
            <p>
              {buyable.name}
              {tier > 0 && <span> {tier < 2 ? '⭐' : tier + '⭐'}</span>}
            </p>
            <p>
              {hasAny && <span className="text-xl">{buyable.amount}</span>}
              <span className="text-sm text-white text-opacity-40">
                {showItem && `/${progress?.next}`}
                {showUpgrade && `/${buyable.maxAmount}`}
              </span>
            </p>
            <p className="text-white text-opacity-40">
              {showItem &&
                `Income: ${short(
                  getIncome(buyable, resourceIncomeMultiplier),
                )}/s`}
              {showUpgrade &&
                buyable.info.prefix +
                  ' ' +
                  short(getUpgradeValue(buyable, items))}
            </p>
          </div>

          {/* right */}
          {isUpgrade && isCompleted(buyable) ? (
            <div className="flex flex-col items-end justify-around text-xl text-green-400 text-opacity-60">
              ✔ Completed
            </div>
          ) : (
            <div className="flex flex-col items-end justify-between">
              <p>Buy x{getBuyAmount()}</p>
              <div className={'price-tag'}>
                <p className={isDisabled ? 'text-red-700' : 'text-green-500'}>
                  {short(adjustedPrice)}
                </p>
                <BaseCoin size={20} />
              </div>
              <p className="leading-tight text-white text-opacity-40">
                {isItem &&
                  `+${short(
                    getIncomePerAmount(
                      buyable,
                      getBuyAmount(),
                      resourceIncomeMultiplier,
                    ),
                  )}/s`}
                {isUpgrade &&
                  buyable.info.operator + getUpgradeValue(buyable, items, true)}
              </p>
            </div>
          )}
        </div>

        {showToolTip && isUpgrade && (
          <Tooltip upgrade={buyable} style={styles.tooltip} />
        )}
      </button>
    </div>
  )
}
