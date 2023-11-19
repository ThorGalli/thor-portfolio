import { getInitialSweeper } from '@/features/minesweeper/data/initialValues'
import useMineSweeperCalculations from '@/features/minesweeper/hooks/useMineSweeperCalculations'
import {
  Cell,
  GameStatus,
  MineSweeperContextProps,
  Stage,
  StageBlueprint,
  SweeperState,
} from '@/features/minesweeper/types'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'

export const MineSweeperProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [
    { blueprint, gameStatus, stage, losingCellID, firstClick, bombsClicked },
    setSweeperState,
  ] = useReducer((prev: SweeperState, next: Partial<SweeperState>) => {
    return { ...prev, ...next }
  }, getInitialSweeper())
  const [selectedStage, setSelectedStage] = useState(0)
  const [prize, setPrize] = useState(0)

  const {
    createBlankStage,
    placeBombs,
    calculateSurroundingBombs,
    revealCell,
    revealAllBombs,
    flagCell,
  } = useMineSweeperCalculations()

  const isPlaying = useMemo(() => {
    return gameStatus === GameStatus.PLAYING
  }, [gameStatus])

  const onFlagCell = useCallback(
    (cell: Cell) => {
      if (
        cell.isRevealed ||
        !stage ||
        !isPlaying ||
        bombsClicked.includes(cell.id)
      )
        return
      const newStage = flagCell(cell, stage)
      setSweeperState({ stage: newStage })
    },
    [stage, isPlaying],
  )

  function generateGameBombs(clickedCell: Cell, stage: Stage) {
    const bombedStage = placeBombs(clickedCell, stage, blueprint.bombAmount)
    const completeStage = calculateSurroundingBombs(bombedStage)

    setSweeperState({ stage: completeStage, firstClick: false })
  }

  const onRevealCell = useCallback(
    (cell: Cell) => {
      if (!stage || !isPlaying || cell.isRevealed) return
      if (firstClick) {
        generateGameBombs(cell, stage)
      }

      if (cell.isBomb) {
        const newBombsClicked = [...bombsClicked, cell.id]
        const newStage = flagCell(cell, stage)
        setSweeperState({
          stage: newStage,
          losingCellID: cell.id,
          bombsClicked: newBombsClicked,
        })
        if (newBombsClicked.length === 3) {
          onLoseGame()
        }
        return
      }

      const newStage = revealCell(cell, stage)
      setSweeperState({ stage: newStage })
    },
    [stage, isPlaying],
  )

  const onLoseGame = useCallback(() => {
    if (!stage) return
    const revealedStage = revealAllBombs(stage)
    setSweeperState({ stage: revealedStage, gameStatus: GameStatus.LOST })
  }, [stage])

  const onWinGame = useCallback(() => {
    if (!stage) return
    setSweeperState({ gameStatus: GameStatus.WON })
  }, [stage])

  const onStartGame = useCallback((stageBlueprint: StageBlueprint) => {
    const newStage = createBlankStage(stageBlueprint)
    setSweeperState({
      blueprint: stageBlueprint,
      stage: newStage,
      gameStatus: GameStatus.PLAYING,
      losingCellID: '',
      firstClick: true,
      bombsClicked: [],
    })
  }, [])

  function revealAround(cell: Cell) {
    const newStage: Stage = [...stage]
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const neighbour = newStage[cell.x + i]?.[cell.y + j]
        const isUnflaggedNeighbour =
          neighbour && neighbour !== cell && !neighbour.isFlagged
        if (isUnflaggedNeighbour) onRevealCell(neighbour)
        if (isUnflaggedNeighbour && neighbour.isBomb) return
      }
    }
  }

  function flagAround(cell: Cell) {
    const newStage: Stage = [...stage]
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const neighbour = newStage[cell.x + i]?.[cell.y + j]
        const isUnflaggedNeighbour =
          neighbour && neighbour !== cell && !neighbour.isFlagged
        if (isUnflaggedNeighbour) onFlagCell(neighbour)
      }
    }
  }

  const onSmartClick = useCallback(
    (cell: Cell) => {
      if (!stage || !isPlaying) return

      const shouldRevealAround =
        cell.isRevealed && cell.bombsAround === cell.flagsAround
      const shouldFlagAround =
        cell.revealedAround === cell.cellsAround - cell.bombsAround

      if (shouldRevealAround) revealAround(cell)
      if (shouldFlagAround) flagAround(cell)
    },
    [stage, isPlaying],
  )

  const totalRevealedCells = useMemo(() => {
    if (!stage) return 0
    return stage.flat().filter((cell) => cell.isRevealed && !cell.isBomb).length
  }, [stage])

  const totalFlaggedCells = useMemo(() => {
    if (!stage) return 0
    return stage.flat().filter((cell) => cell.isFlagged).length
  }, [stage])

  const totalSafeCells = useMemo(() => {
    return (blueprint && blueprint?.size ** 2 - blueprint?.bombAmount) || 0
  }, [blueprint])

  const totalBombs = useMemo(() => {
    if (!blueprint) return 0
    return blueprint.bombAmount
  }, [blueprint])

  const contextValues = useMemo(
    () => ({
      totalRevealedCells,
      totalFlaggedCells,
      totalSafeCells,
      totalBombs,
      stage,
      blueprint,
      gameStatus,
      onStartGame,
      onRevealCell,
      onSmartClick,
      onFlagCell,
      onWinGame,
      selectedStage,
      setSelectedStage,
      prize,
      setPrize,
      losingCellID,
      bombsClicked,
    }),
    [
      totalRevealedCells,
      totalFlaggedCells,
      totalSafeCells,
      totalBombs,
      stage,
      blueprint,
      gameStatus,
      onStartGame,
      onRevealCell,
      onSmartClick,
      onFlagCell,
      onWinGame,
      selectedStage,
      setSelectedStage,
      prize,
      setPrize,
      losingCellID,
      bombsClicked,
    ],
  )

  return (
    <SweeperContext.Provider value={contextValues}>
      {children}
    </SweeperContext.Provider>
  )
}

const SweeperContext = createContext<MineSweeperContextProps>({
  totalRevealedCells: 0,
  totalFlaggedCells: 0,
  totalSafeCells: 0,
  totalBombs: 0,
  stage: [],
  blueprint: { name: '', size: 0, bombAmount: 0 },
  gameStatus: GameStatus.NOT_STARTED,
  onStartGame: () => null,
  onRevealCell: () => null,
  onSmartClick: () => null,
  onFlagCell: () => null,
  onWinGame: () => null,
  setSelectedStage: () => null,
  selectedStage: 0,
  prize: 0,
  setPrize: () => null,
  losingCellID: '',
  bombsClicked: [],
})

export function useSweeperContext() {
  return useContext(SweeperContext)
}
