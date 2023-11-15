'use client'
import ConfirmationDialog from '@/components/settings/confirmationDialog'
import { bluePrintList } from '@/features/minesweeper/data/initialValues'
import { GameStatus } from '@/features/minesweeper/types'
import { useEffect, useMemo } from 'react'
import useClickerCalculations from '../clicker/hooks/useClickerCalculations'
import { useSweeperContext } from '@/features/minesweeper/useSweeperContext'
import BluePrintBar from '@/features/minesweeper/components/bluePrintBar'
import Drawer from '@/components/navigation/drawer'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { useToast } from '@/contexts/useToast'
import useMineSweeperCalculations from './hooks/useMineSweeperCalculations'
import CellBox from './components/cell'
import GameHeader from './components/gameHeader'
import { useDisclosure } from '@/hooks/useDisclosure'
import BaseCoin from '@/components/coins/baseCoins'

export default function MineSweeper() {
  const {
    gameStatus,
    onFlagCell,
    onRevealCell,
    stage,
    onStartGame,
    totalBombs,
    totalFlaggedCells,
    totalRevealedCells,
    totalSafeCells,
    selectedStage,
    setSelectedStage,
    prize,
    setPrize,
    onWinGame,
    onSmartClick,
    bombsClicked,
  } = useSweeperContext()

  const { short } = useClickerCalculations()
  const { onWinMineSweeper } = useClickerContext()
  const { resourceIncome, autoIncome, upgrades } = useClickerContext()
  const { calculatePrizeSeconds, secondsToShortTime } =
    useMineSweeperCalculations()

  const restartDialog = useDisclosure()
  const prizeDialog = useDisclosure()
  const stageSelectDrawer = useDisclosure()

  const penalty = (3 - bombsClicked.length) / 3
  const totalIncome = resourceIncome + autoIncome
  const currentStage = bluePrintList[selectedStage]
  const isPlaying = gameStatus === GameStatus.PLAYING
  const hasStarted = gameStatus !== GameStatus.NOT_STARTED

  const handleSelectBlueprint = (index: number): void => {
    stageSelectDrawer.onClose()
    setSelectedStage(index)
    onStartGame(bluePrintList[index])
  }

  function promptRestartGame() {
    if (isPlaying && totalRevealedCells > 0) restartDialog.onOpen()
    else handleStartGame()
  }

  function handleStartGame() {
    onStartGame(bluePrintList[selectedStage])
    restartDialog.onClose()
  }

  const prizeDisplay = useMemo(() => {
    const { value, display, seconds } = getPrizeDisplay(selectedStage, penalty)
    setPrize?.(value)
    return {
      value,
      display,
      seconds,
    }
  }, [currentStage, totalIncome, upgrades?.goldMine?.amount, penalty])

  function getPrizeDisplay(index: number = selectedStage, penalty = 1) {
    const secondsPerBomb = upgrades?.goldMine?.amount ?? 0
    const seconds = calculatePrizeSeconds(
      bluePrintList[index].bombAmount,
      secondsPerBomb,
    )
    const value = seconds * totalIncome * penalty
    return {
      value,
      display: short(value, 2).toString(),
      seconds: secondsToShortTime(seconds * penalty),
    }
  }

  const cursorClass = isPlaying ? '' : 'cursor-default  pointer-events-none'

  const mapKey = useMemo(() => {
    return stage?.map((row) => row.map((cell) => cell.id).join('')).join('')
  }, [stage])

  const cellComponents = useMemo(() => {
    return stage?.map((row) => {
      const rowKey = row.map((cell) => cell.id).join('')
      return (
        <div key={rowKey} className={'flex'}>
          {row.map((cell) => {
            return (
              <CellBox
                key={mapKey + cell.id}
                cell={cell}
                onReveal={onRevealCell}
                onFlag={onFlagCell}
                onSmartClick={onSmartClick}
              />
            )
          })}
        </div>
      )
    })
  }, [stage, gameStatus])

  const bluePrintComponents = useMemo(() => {
    return bluePrintList.map((blueprint, index) => {
      return (
        <BluePrintBar
          className="btn-yellow bar"
          index={index}
          blueprint={blueprint}
          key={blueprint.name}
          onSelect={handleSelectBlueprint}
          prizeDisplay={getPrizeDisplay(index)}
        />
      )
    })
  }, [bluePrintList])

  useEffect(() => {
    if (!stage) return
    if (
      totalRevealedCells === totalSafeCells &&
      gameStatus === GameStatus.PLAYING
    ) {
      setTimeout(() => {
        prizeDialog.onOpen()
        onWinGame()
        onWinMineSweeper(prize)
      }, 200)
    }
  }, [totalRevealedCells])

  return (
    <div className="relative mx-[-0.5rem] lg:mt-14 lg:pt-2">
      <div className="flex flex-col items-center justify-around gap-4 bg-slate-900 ">
        {!hasStarted && (
          <div
            id="greetText"
            className="flex flex-col items-center gap-2 p-2 text-center text-yellow-200"
          >
            <button
              className="white-hover mx-auto flex w-fit flex-col items-center text-4xl text-yellow-200 active:opacity-70"
              onClick={promptRestartGame}
            >
              <p>Mine Sweeper</p>
              <p>😉</p>
            </button>
            <p>Win a match of Mine Sweeper and earn coins!</p>
            <p>
              <span className="text-orange-400">Higher difficulties</span> earn
              you more coins and the amount is also based on your{' '}
              <span className="text-orange-400">Income</span>
            </p>
            <p>
              Choose a difficulty to{' '}
              <span className="text-orange-400">play</span>!
            </p>
            <BluePrintBar
              className="btn-slate bar max-w-lg"
              index={selectedStage}
              blueprint={bluePrintList[selectedStage]}
              onClick={stageSelectDrawer.onOpen}
              prizeDisplay={getPrizeDisplay(selectedStage, penalty)}
            />
          </div>
        )}

        {/* Game Header */}
        <GameHeader
          bombsClicked={bombsClicked}
          gameStatus={gameStatus}
          promptRestartGame={promptRestartGame}
          totalBombs={totalBombs}
          totalFlaggedCells={totalFlaggedCells}
          totalRevealedCells={totalRevealedCells}
          totalSafeCells={totalSafeCells}
        >
          <div className="flex w-full flex-col items-center px-2">
            <BluePrintBar
              className="btn-slate bar max-w-lg"
              index={selectedStage}
              blueprint={bluePrintList[selectedStage]}
              onClick={stageSelectDrawer.onOpen}
              prizeDisplay={getPrizeDisplay(selectedStage, penalty)}
              small
            />
          </div>
        </GameHeader>

        {/* Absolute components */}
        <ConfirmationDialog
          isOpen={restartDialog.isOpen}
          onCancel={restartDialog.onClose}
          onConfirm={handleStartGame}
          confirmQuestion="Are you sure you want abandon your progress and restart?"
          confirmAnswer="Restart"
        />

        {/* Prize Dialog */}
        <ConfirmationDialog
          isOpen={prizeDialog.isOpen}
          onCancel={prizeDialog.onClose}
          onConfirm={prizeDialog.onClose}
          confirmQuestion={
            <div>
              Congratulations!
              <div className="flex items-center gap-2">
                You earned{' '}
                <span className="text-yellow-200">
                  {prizeDisplay.display} 💰
                </span>
              </div>
            </div>
          }
          confirmAnswer="Close"
          hideCancel
          variant="prize"
        />

        <Drawer
          isOpen={stageSelectDrawer.isOpen}
          onClose={stageSelectDrawer.onClose}
          side="right"
        >
          <div className="list-wrapper">
            <header className="mx-2 h-fit rounded-md bg-slate-700 px-2 py-4 text-center text-yellow-200">
              Stage Selector
            </header>
            <div className="flex flex-col gap-2 px-2">
              {bluePrintComponents}
            </div>
          </div>
        </Drawer>
      </div>
      {/* Game Window */}
      {hasStarted && (
        <div className="mx-auto mb-8 mt-16 flex max-w-fit overflow-x-auto rounded-[14px] bg-slate-700 p-2 lg:mt-2">
          <div
            className={cursorClass + ' rounded-[6px] border-2 border-slate-900'}
          >
            {cellComponents}
          </div>
        </div>
      )}
    </div>
  )
}
