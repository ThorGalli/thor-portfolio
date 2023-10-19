'use client'
import ConfirmationDialog from '@/components/settings/confirmationDialog'
import CellBox from '@/components/sweeper/cell'
import { bluePrintList } from '@/features/minesweeper/data/initialValues'
import { GameStatus } from '@/features/minesweeper/types'
import { useUrlDisclosure } from '@/hooks/useUrlDisclosure'
import { useEffect, useMemo } from 'react'
import useClickerCalculations from '../clicker/hooks/useClickerCalculations'
import { useSweeperContext } from '@/features/minesweeper/useSweeperContext'
import BluePrintBar from '@/components/sweeper/bluePrintBar'
import Drawer from '@/components/navigation/drawer'
import { useClickerContext } from '@/features/clicker/useClickerContext'
import { useToast } from '@/contexts/useToast'

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
  } = useSweeperContext()

  const { short } = useClickerCalculations()
  const { onWinMineSweeper } = useClickerContext()

  const { toast } = useToast()
  const restartDialog = useUrlDisclosure('restartMineSweeper')
  const stageSelectDrawer = useUrlDisclosure('stageSelectOpen')

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
    return short(prize, 2)
  }, [prize])

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
          setPrize={setPrize}
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
      onWinGame()
      onWinMineSweeper(prize)
      toast({
        message: (
          <p>
            Congratulations!
            <br /> You earned {prizeDisplay.display} coins!
          </p>
        ),
      })
    }
  }, [totalRevealedCells])

  return (
    <div className="relative mx-[-0.5rem] pt-[3.5rem] lg:mt-14 lg:pt-2">
      <div className="flex flex-col items-center justify-around gap-4 bg-slate-900 ">
        {!hasStarted && (
          <div id="greetText" className="flex flex-col items-center gap-2 p-2">
            <button
              className="white-hover mx-auto flex w-fit flex-col text-4xl text-yellow-200 active:opacity-70"
              onClick={promptRestartGame}
            >
              <p>Mine Sweeper</p>
              <p>😉</p>
            </button>
            <p className="text-yellow-200">
              Win a match of Mine Sweeper and earn coins!
            </p>
            <p className="text-yellow-200">
              <span className="text-orange-400">Higher difficulties</span> earn
              you more coins and the amount is also based on your{' '}
              <span className="text-orange-400">Income</span>
            </p>
          </div>
        )}

        {/* Selected dificulty */}
        <div
          id="difficulty-selector"
          className="flex w-full flex-col items-center px-2"
        >
          <p className="text-slate-200">Choose a difficulty:</p>
          <BluePrintBar
            className="btn-slate bar max-w-lg"
            index={selectedStage}
            blueprint={bluePrintList[selectedStage]}
            onClick={stageSelectDrawer.onOpen}
          />
        </div>

        {/* Game Header */}
        {hasStarted && (
          <header className="sweeper-header">
            <p>
              ✅ {totalRevealedCells}/{totalSafeCells}
            </p>
            <button
              className="white-hover absolute w-fit text-4xl active:opacity-70"
              onClick={promptRestartGame}
            >
              {gameStatus === GameStatus.PLAYING && '🙂'}
              {gameStatus === GameStatus.LOST && '💀'}
              {gameStatus === GameStatus.WON && '😎'}
            </button>
            <p>
              {totalFlaggedCells}/{totalBombs} 🚩
            </p>
          </header>
        )}

        {/* Absolute components */}
        <ConfirmationDialog
          isOpen={restartDialog.isOpen}
          onCancel={restartDialog.onClose}
          onConfirm={handleStartGame}
          confirmQuestion="Are you sure you want abandon your progress and restart?"
          confirmAnswer="Restart"
        />

        <Drawer
          isOpen={stageSelectDrawer.isOpen}
          onClose={stageSelectDrawer.onClose}
          side="right"
        >
          <div className="list-wrapper">
            <header className="list-header">Stage Selector</header>
            <div className="list">{bluePrintComponents}</div>
          </div>
        </Drawer>
      </div>

      {/* Game Window */}
      {hasStarted && (
        <div className="mx-auto mb-8 mt-4 flex max-w-fit overflow-x-auto rounded-[14px] border-slate-700 bg-slate-700 p-2">
          <div
            id="mineField"
            className={cursorClass + ' rounded-[6px] border-2 border-slate-900'}
          >
            {cellComponents}
          </div>
        </div>
      )}
    </div>
  )
}
