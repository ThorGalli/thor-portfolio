import { GameStatus, StageBlueprint, SweeperState } from '../types'

export const bluePrintList: StageBlueprint[] = [
  {
    name: 'Beginner',
    size: 8,
    bombAmount: 8,
  }, // 8/(8*8) = 12.5% bomb density
  {
    name: 'Easy',
    size: 10,
    bombAmount: 13,
  }, // 13/(10*10) = 13% bomb density
  {
    name: 'Normal',
    size: 12,
    bombAmount: 20,
  }, // 20/(12*12) = 13.88% bomb density
  {
    name: 'Intermediate',
    size: 15,
    bombAmount: 33,
  }, // 33/(15*15) = 14,67% bomb density
  {
    name: 'Advanced',
    size: 20,
    bombAmount: 60,
  }, // 120/(24*24) = 15% bomb density
  {
    name: 'Expert',
    size: 25,
    bombAmount: 100,
  }, // 100/(25*25) = 16% bomb density
  {
    name: 'Master',
    size: 30,
    bombAmount: 150,
  }, // 150/(30*30) = 16.67% bomb density
  {
    name: 'Legendary',
    size: 40,
    bombAmount: 280,
  }, // 280/(40*40) = 17.5% bomb density
  {
    name: 'Mythic',
    size: 50,
    bombAmount: 450,
  }, // 450/(50*50) = 18% bomb density
]

export function getInitialSweeper(): SweeperState {
  return {
    blueprint: bluePrintList[0],
    gameStatus: GameStatus.NOT_STARTED,
    stage: [],
    losingCellID: null,
    firstClick: true,
    bombsClicked: [],
  }
}
