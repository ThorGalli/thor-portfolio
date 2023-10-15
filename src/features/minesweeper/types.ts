export type StageBlueprint = {
  name: string
  size: number
  bombAmount: number
}
export enum GameStatus {
  'NOT_STARTED',
  'PLAYING',
  'WON',
  'LOST',
}
export type Cell = {
  id: string
  x: number
  y: number
  isBomb: boolean
  isRevealed: boolean
  isFlagged: boolean
  surroundingBombs: number
}

export type Stage = Cell[][]

export type MineSweeperContextProps = {
  totalRevealedCells: number
  totalFlaggedCells: number
  totalSafeCells: number
  totalBombs: number
  stage: Stage
  blueprint: StageBlueprint
  gameStatus: GameStatus
  onStartGame: (blueprint: StageBlueprint) => void
  onRevealCell: (cell: Cell) => void
  onFlagCell: (cell: Cell) => void
  onWinGame: () => void
  setSelectedStage: (index: number) => void
  selectedStage: number
  prize: number
  setPrize: (prize: number) => void
  losingCellID: string | null
}

export type SweeperState = {
  blueprint: StageBlueprint
  gameStatus: GameStatus
  stage: Stage
  losingCellID: string | null
}
