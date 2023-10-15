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
          surroundingBombs: 0,
        })
      }
    }
    return blankStage
  }

  function calculatePrizeSeconds(totalBombs: number) {
    const globalMultiplier = 1
    const secondsPerBomb = 2
    const bonuses = [
      { bombsRequired: 4, seconds: 0.05 },
      { bombsRequired: 28, seconds: 0.05 },
      { bombsRequired: 280, seconds: 0.05 },
    ]
    const extraSeconds = bonuses.reduce((acc, bonus) => {
      const bonusCount = Math.floor(totalBombs / bonus.bombsRequired)
      return acc + bonusCount * bonus.seconds
    }, 0)
    const seconds =
      globalMultiplier * totalBombs * (secondsPerBomb + extraSeconds)
    return seconds
  }

  function placeBombs(stage: Stage, bombAmount: number) {
    const bombedMap: Stage = [...stage]
    for (let i = 0; i < bombAmount; i++) {
      const x = Math.floor(Math.random() * bombedMap.length)
      const y = Math.floor(Math.random() * bombedMap.length)
      bombedMap[x][y].isBomb = true
    }
    return bombedMap
  }

  function revealCell(cell: Cell, stage: Stage) {
    if (cell.isRevealed) return
    let newStage: Stage = [...stage]
    newStage[cell.x][cell.y].isRevealed = true
    newStage[cell.x][cell.y].isFlagged = false
    if (cell.surroundingBombs === 0) {
      newStage = revealTilesAroundZeros(cell, newStage)
    }
    return newStage
  }

  function calculateSurroundingBombs(stage: Stage) {
    const numberedStage: Stage = [...stage]
    for (let x = 0; x < numberedStage.length; x++) {
      for (let y = 0; y < numberedStage.length; y++) {
        const cell = numberedStage[x][y]
        if (cell.isBomb) {
          cell.surroundingBombs = -1
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
          cell.surroundingBombs = surroundingBombs
        }
      }
    }
    return numberedStage
  }

  function generateStage(blueprint: StageBlueprint) {
    const blankStage = createBlankStage(blueprint)
    const bombedStage = placeBombs(blankStage, blueprint.bombAmount)
    const completeStage = calculateSurroundingBombs(bombedStage)
    return completeStage
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
    console.log('newStage', newStage)
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
        const neighbour = stage[rowAround][colAround]
        if (neighbour.isRevealed) continue
        stage[rowAround][colAround].isRevealed = true
        if (neighbour.surroundingBombs === 0) {
          stage = revealTilesAroundZeros(neighbour, stage)
        }
      }
    }
    return stage
  }

  return {
    revealCell,
    revealAllBombs,
    generateStage,
    calculatePrizeSeconds,
  }
}
