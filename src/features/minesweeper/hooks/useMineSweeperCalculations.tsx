import { BASE_SECONDS_PER_BOMB } from '@/features/clicker/data/upgrades'
import { StageBlueprint, Stage, Cell } from '../types'

export default function useMineSweeperCalculations() {
  function createBlankStage(blueprint: StageBlueprint) {
    const blankStage: Stage = []
    for (let x = 0; x < blueprint.size; x++) {
      blankStage.push([])
      for (let y = 0; y < blueprint.size; y++) {
        blankStage[x].push({
          id: x + ',' + y,
          x,
          y,
          isBomb: false,
          isRevealed: false,
          isFlagged: false,
          bombsAround: 0,
          flagsAround: 0,
          revealedAround: 0,
          cellsAround: getCellsAroundAmount(x, y, blueprint.size),
        })
      }
    }
    return blankStage
  }

  function areCellsApart(cell1: Cell, cell2: Cell) {
    return Math.abs(cell1.x - cell2.x) > 1 || Math.abs(cell1.y - cell2.y) > 1
  }

  function secondsToShortTime(seconds: number) {
    if (seconds < 60) return Math.floor(seconds) + 's'
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm'
    if (seconds < 86400)
      return (
        Math.floor(seconds / 3600) +
        'h ' +
        Math.floor((seconds % 3600) / 60) +
        'm'
      )
    return (
      Math.floor(seconds / 86400) +
      'd ' +
      Math.floor((seconds % 86400) / 3600) +
      'h'
    )
  }

  function getCellsAroundAmount(x: number, y: number, size: number) {
    let cellsAround = 8
    if (x === 0 || x === size - 1) cellsAround -= 3
    if (y === 0 || y === size - 1) cellsAround -= 3
    if (x === 0 && y === 0) cellsAround++
    if (x === 0 && y === size - 1) cellsAround++
    if (x === size - 1 && y === 0) cellsAround++
    if (x === size - 1 && y === size - 1) cellsAround++
    return cellsAround
  }

  function calculatePrizeSeconds(totalBombs: number, goldMineSeconds: number) {
    const bombFactor = 3
    const secondsPerBomb = BASE_SECONDS_PER_BOMB + goldMineSeconds
    const baseSeconds = secondsPerBomb * totalBombs
    const bonusSeconds = secondsPerBomb * ((totalBombs * bombFactor) / 100) ** 2
    const totalSeconds = baseSeconds + bonusSeconds
    return totalSeconds
  }

  function placeBombs(clickedCell: Cell, stage: Stage, bombAmount: number) {
    const bombedMap: Stage = [...stage]
    let bombsPlaced = 0
    while (bombsPlaced < bombAmount) {
      const randomX = Math.floor(Math.random() * bombedMap.length)
      const randomY = Math.floor(Math.random() * bombedMap.length)
      const cell = bombedMap[randomX][randomY]
      if (areCellsApart(cell, clickedCell) && !cell.isBomb) {
        cell.isBomb = true
        bombsPlaced++
      }
    }
    return bombedMap
  }

  function revealCell(cell: Cell, stage: Stage) {
    let newStage: Stage = [...stage]
    const currentCell = newStage[cell.x][cell.y]

    // increment revealedAround and decrement flagsAround for all neighbours
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const neighbour = newStage[cell.x + i]?.[cell.y + j]
        if (neighbour && neighbour !== currentCell) {
          neighbour.revealedAround++
          if (currentCell.isFlagged) {
            neighbour.flagsAround--
          }
        }
      }
    }

    currentCell.isRevealed = true
    currentCell.isFlagged = false
    if (cell.bombsAround === 0) {
      newStage = revealTilesAroundZeros(cell, newStage)
    }
    return newStage
  }

  function flagCell(cell: Cell, stage: Stage) {
    if (cell.isRevealed) return
    const newStage = [...stage]
    const currentCell = newStage[cell.x][cell.y]
    const isFlagged = currentCell.isFlagged

    // increment revealedAround and decrement flagsAround for all neighbours
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const neighbour = newStage[cell.x + i]?.[cell.y + j]
        if (neighbour && neighbour !== currentCell) {
          neighbour.flagsAround += isFlagged ? -1 : 1
        }
      }
    }

    newStage[cell.x][cell.y].isFlagged = !cell.isFlagged
    return newStage
  }

  function calculateSurroundingBombs(stage: Stage) {
    const numberedStage: Stage = [...stage]
    for (let x = 0; x < numberedStage.length; x++) {
      for (let y = 0; y < numberedStage.length; y++) {
        const cell = numberedStage[x][y]
        if (cell.isBomb) {
          cell.bombsAround = -1
        } else {
          let surroundingBombs = 0
          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              const neighbour = numberedStage[x + i]?.[y + j]
              if (neighbour?.isBomb) {
                surroundingBombs++
              }
            }
          }
          cell.bombsAround = surroundingBombs
        }
      }
    }
    return numberedStage
  }

  function revealAllBombs(stage: Stage) {
    const newStage: Stage = JSON.parse(JSON.stringify(stage))
    for (let x = 0; x < newStage.length; x++) {
      for (let y = 0; y < newStage.length; y++) {
        if (newStage[x][y].isBomb) {
          newStage[x][y].isFlagged = false
          newStage[x][y].isRevealed = true
        }
      }
    }
    return newStage
  }

  function revealTilesAroundZeros(cell: Cell, stage: Stage) {
    const size = stage.length
    const { x, y } = cell

    for (
      let rowAround = Math.max(0, x - 1);
      rowAround < Math.min(size, x + 2);
      rowAround++
    ) {
      for (
        let colAround = Math.max(0, y - 1);
        colAround < Math.min(size, y + 2);
        colAround++
      ) {
        const currentCell = stage[rowAround][colAround]
        if (currentCell.isRevealed) continue
        currentCell.isRevealed = true

        // increment revealedAround and decrement flagsAround for all neighbours
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            const adjacent = stage[currentCell.x + i]?.[currentCell.y + j]
            if (adjacent && adjacent !== currentCell) {
              adjacent.revealedAround++
              if (currentCell.isFlagged) {
                adjacent.flagsAround--
              }
            }
          }
        }

        if (currentCell.bombsAround === 0) {
          stage = revealTilesAroundZeros(currentCell, stage)
        }
      }
    }
    return stage
  }

  function isSolvable(stage: Stage, firstCellClicked: Cell) {
    // use Backtracking algorithm to check if stage is solvable
    console.log('isSolvable?')
    const size = stage.length

    const visited: boolean[][] = []
    for (let i = 0; i < size; i++) {
      visited.push([])
      for (let j = 0; j < size; j++) {
        visited[i].push(false)
      }
    }

    const queue: Cell[] = []
    queue.push(firstCellClicked)
    visited[firstCellClicked.x][firstCellClicked.y] = true
    while (queue.length > 0) {
      const cell = queue.shift()
      console.log('checking cell', cell)
      if (cell?.bombsAround === 0) {
        for (
          let rowAround = Math.max(0, cell.x - 1);
          rowAround < Math.min(size, cell.x + 2);
          rowAround++
        ) {
          for (
            let colAround = Math.max(0, cell.y - 1);
            colAround < Math.min(size, cell.y + 2);
            colAround++
          ) {
            const currentCell = stage[rowAround][colAround]
            if (!visited[currentCell.x][currentCell.y]) {
              visited[currentCell.x][currentCell.y] = true
              queue.push(currentCell)
            }
          }
        }
      }
    }
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const cell = stage[x][y]
        if (!visited[cell.x][cell.y] && !cell.isBomb) {
          return false
        }
      }
    }
    return true
  }

  return {
    flagCell,
    revealCell,
    revealAllBombs,
    calculatePrizeSeconds,
    secondsToShortTime,
    placeBombs,
    createBlankStage,
    calculateSurroundingBombs,
    isSolvable,
  }
}
