import { useEffect, useState } from 'react'

type TwoStageAnimationArgs = {
  isActive: boolean
  animStyles: {
    [key: string]: {
      inactive: React.CSSProperties
      active: React.CSSProperties
    }
  }
  durationInMs: number
  transition: string
}

export default function useTwoStagesAnimation(
  twoStageAnimationArgs: TwoStageAnimationArgs,
) {
  const { animStyles, durationInMs, isActive, transition } =
    twoStageAnimationArgs
  const [isContentActive, setContentActive] = useState(false)
  const [styles, setStyles] = useState<{
    [key: string]: React.CSSProperties
  }>({})

  function animateClose(onClose: () => void) {
    setContentActive(false)
    setTimeout(() => {
      onClose()
    }, durationInMs)
  }

  useEffect(() => {
    if (isActive) setContentActive(true)
  }, [isActive])

  useEffect(() => {
    const styles: { [key: string]: React.CSSProperties } = {}
    Object.keys(animStyles).forEach((key) => {
      styles[key] = {
        pointerEvents: isContentActive ? 'auto' : 'none',
        transition: `all ${durationInMs}ms ${transition}`,
        ...(isContentActive
          ? animStyles[key].active
          : animStyles[key].inactive),
      }
    })
    setStyles(styles)
  }, [isContentActive])

  return { showContent: isContentActive, animateClose, styles }
}
