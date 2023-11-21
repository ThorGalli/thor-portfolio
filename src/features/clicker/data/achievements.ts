import { ClickerState } from '../clickerTypes'
import { getTier, getTotalTiers } from './items'
import { isCompleted } from './upgrades'

export type Achievement = {
  id: string
  name: string
  description: string
  unlocked: boolean
  criteria: (gameState: ClickerState) => boolean
}
export type ShopAchievements = {
  [key: string]: Achievement
}

export const baseAchievements: Achievement[] = [
  {
    id: 'clicker1',
    name: 'Hello Clicker',
    description: 'Click the Coin',
    unlocked: false,
    criteria: (gameState) => gameState.clicks >= 1,
  },

  {
    id: 'clicker10',
    name: 'Those are rookie numbers',
    description: 'Click the coin 10 times',
    unlocked: false,
    criteria: (gameState) => gameState.clicks >= 10,
  },
  {
    id: 'clicker100',
    name: 'Are you clicking me?',
    description: 'Click the coin 100 times',
    unlocked: false,
    criteria: (gameState) => gameState.clicks >= 100,
  },
  {
    id: 'clicker1000',
    name: 'Let the finger rest',
    description: 'Click the coin 1000 times',
    unlocked: false,
    criteria: (gameState) => gameState.clicks >= 1000,
  },
  {
    id: 'clickerbot_1',
    name: 'Are you botting?',
    description: 'Buy your first bot!',
    unlocked: false,
    criteria: (gameState) => gameState.upgrades.autoClicker.amount >= 1,
  },
  {
    id: 'complete_clickerbot_1',
    name: 'You ARE botting!',
    description: 'Buy all the Clicker Bots (Mk1)!',
    unlocked: false,
    criteria: (gameState) => isCompleted(gameState.upgrades.autoClicker),
  },
  {
    id: 'complete_clickerbot_2',
    name: "I'll report you for botting!",
    description: 'Buy all the Clicker Bots (Mk2)!',
    unlocked: false,
    criteria: (gameState) => isCompleted(gameState.upgrades.autoClicker2),
  },
  {
    id: 'complete_clickerbot_3',
    name: '01000010 01001111 01010100',
    description: 'Buy all the Clicker Bots (Mk3)!',
    unlocked: false,
    criteria: (gameState) => isCompleted(gameState.upgrades.autoClicker3),
  },
  {
    id: 'volunteer_1',
    name: 'Free Labor',
    description: "Hire your first Volunteer! Wait... shouldn't they be free?",
    unlocked: false,
    criteria: (gameState) => gameState.items.volunteer.amount >= 1,
  },
  {
    id: 'trainee_1',
    name: 'How to train your dev',
    description: 'Hire your first Trainee!',
    unlocked: false,
    criteria: (gameState) => gameState.items.trainee.amount >= 1,
  },
  {
    id: 'juniorDev_1',
    name: 'It works on my machine!',
    description: 'Hire your first Junior Dev!',
    unlocked: false,
    criteria: (gameState) => gameState.items.juniorDev.amount >= 1,
  },
  {
    id: 'midDev_1',
    name: 'Coffee => Code',
    description: 'Hire your first Mid-Level Dev!',
    unlocked: false,
    criteria: (gameState) => gameState.items.midDev.amount >= 1,
  },
  {
    id: 'seniorDev_1',
    name: 'Well, it depends...',
    description: 'Hire your first Senior Dev!',
    unlocked: false,
    criteria: (gameState) => gameState.items.seniorDev.amount >= 1,
  },
  {
    id: 'techLeader_1',
    name: "I'm the captain now!",
    description: 'Hire your first Tech Leader!',
    unlocked: false,
    criteria: (gameState) => gameState.items.techLeader.amount >= 1,
  },
  {
    id: 'unlock_startup',
    name: 'Start it up!',
    description:
      'Have at least 1 Tech Lead, 5 Senior Dev, 10 Mid-level Devs and 10 Junior Devs',
    unlocked: false,
    criteria: (gameState) => {
      const { items } = gameState
      return (
        items.techLeader.amount >= 1 &&
        items.seniorDev.amount >= 5 &&
        items.midDev.amount >= 10 &&
        items.juniorDev.amount >= 10
      )
    },
  },
  {
    id: 'startup_1',
    name: 'It all starts with an idea',
    description: 'Acquire your first Startup!',
    unlocked: false,
    criteria: (gameState) => gameState.items.startup.amount >= 1,
  },
  {
    id: 'smallCompany_1',
    name: "It's not much, but it's honest work",
    description: 'Acquire your first Small Company!',
    unlocked: false,
    criteria: (gameState) => gameState.items.smallCompany.amount >= 1,
  },
  {
    id: 'mediumCompany_1',
    name: "It's average, ok?",
    description: 'Acquire your first Medium Company!',
    unlocked: false,
    criteria: (gameState) => gameState.items.mediumCompany.amount >= 1,
  },
  {
    id: 'bigCompany_1',
    name: 'Size matters',
    description: 'Acquire your first Big Company!',
    unlocked: false,
    criteria: (gameState) => gameState.items.bigCompany.amount >= 1,
  },
  {
    id: 'corporation_1',
    name: 'Hello Capitalism',
    description: 'Acquire your first Corporation!',
    unlocked: false,
    criteria: (gameState) => gameState.items.corporation.amount >= 1,
  },
  {
    id: 'techUnicorn_1',
    name: 'Unicorn Hunter',
    description: 'Acquire your first Tech Unicorn!',
    unlocked: false,
    criteria: (gameState) => gameState.items.techUnicorn.amount >= 1,
  },
  {
    id: 'bank_1',
    name: 'Money is power',
    description: 'Acquire your first Natinal Bank!',
    unlocked: false,
    criteria: (gameState) => gameState.items.bank.amount >= 1,
  },
  {
    id: 'investBank_1',
    name: 'Money = More Money',
    description: 'Acquire your first Investment Bank!',
    unlocked: false,
    criteria: (gameState) => gameState.items.investBank.amount >= 1,
  },
  {
    id: 'interBank_1',
    name: 'Expanding the business',
    description: 'Acquire your first International Bank!',
    unlocked: false,
    criteria: (gameState) => gameState.items.interBank.amount >= 1,
  },
  {
    id: 'ventureCapital_1',
    name: 'Going Global',
    description: 'Acquire your first Global Conglomerate!',
    unlocked: false,
    criteria: (gameState) => gameState.items.ventureCapital.amount >= 1,
  },
  {
    id: 'terraformingcorp_1',
    name: 'This world is not enough',
    description: 'Acquire your first Terraforming Corp!',
    unlocked: false,
    criteria: (gameState) => gameState.items.terraformingcorp.amount >= 1,
  },
  {
    id: 'spaceTravelCorp_1',
    name: 'You gotta sell the dream',
    description: 'Acquire your first Space Travel Corp!',
    unlocked: false,
    criteria: (gameState) => gameState.items.spaceTravelCorp.amount >= 1,
  },
  {
    id: 'spaceMiningCorp_1',
    name: 'Rock and Stone!',
    description: 'Acquire your first Space Mining Corp!',
    unlocked: false,
    criteria: (gameState) => gameState.items.spaceMiningCorp.amount >= 1,
  },
  {
    id: 'interGalacticBank_1',
    name: 'Banking the Universe',
    description: 'Acquire your first Space Mining Corp!',
    unlocked: false,
    criteria: (gameState) => gameState.items.interGalacticBank.amount >= 1,
  },
  {
    id: 'tier_1',
    name: 'Quality++',
    description: 'Get a resource to Tier +1',
    unlocked: false,
    criteria: (gameState) => {
      const { items } = gameState
      return getTotalTiers(items) >= 1
    },
  },
  {
    id: 'tier_5',
    name: 'Quality+++++',
    description: 'Get a single resource to Tier +5',
    unlocked: false,
    criteria: (gameState) => {
      const { items } = gameState
      return Object.values(items).some((item) => getTier(item) >= 5)
    },
  },
  {
    id: 'tier_10',
    name: 'Quality+++++++++',
    description: 'Get a single resource to Tier +10',
    unlocked: false,
    criteria: (gameState) => {
      const { items } = gameState
      return Object.values(items).some((item) => getTier(item) >= 10)
    },
  },
  {
    id: 'totalTier1',
    name: 'Tiered-Up I: The Tier Menace',
    description: 'Accumulate 10 Tiers levels over all resources',
    unlocked: false,
    criteria: (gameState) => {
      const { items } = gameState
      return getTotalTiers(items) >= 10
    },
  },
  {
    id: 'totalTier2',
    name: 'Tiered-Up II: The Tier Wars',
    description: 'Accumulate 20 Tiers levels over all resources',
    unlocked: false,
    criteria: (gameState) => {
      const { items } = gameState
      return getTotalTiers(items) >= 20
    },
  },
  {
    id: 'totalTier3',
    name: 'Tiered-Up III: Revenge of the Tier',
    description: 'Accumulate 30 Tiers levels over all resources',
    unlocked: false,
    criteria: (gameState) => {
      const { items } = gameState
      return getTotalTiers(items) >= 30
    },
  },
  {
    id: 'totalTier4',
    name: 'Tiered-Up IV: A New Tier',
    description: 'Accumulate 40 Tiers levels over all resources',
    unlocked: false,
    criteria: (gameState) => {
      const { items } = gameState
      return getTotalTiers(items) >= 40
    },
  },
  {
    id: 'totalTier5',
    name: 'Tiered-Up V: The Tier Strikes Back',
    description: 'Accumulate 50 Tiers levels over all resources',
    unlocked: false,
    criteria: (gameState) => {
      const { items } = gameState
      return getTotalTiers(items) >= 50
    },
  },
  {
    id: 'totalTier6',
    name: 'Tiered-Up VI: Return of the Tier',
    description: 'Accumulate 60 Tiers levels over all resources',
    unlocked: false,
    criteria: (gameState) => {
      const { items } = gameState
      return getTotalTiers(items) >= 60
    },
  },
  {
    id: 'spelunker1',
    name: 'Spelunker',
    description: 'Max out the Gold Mine upgrade',
    unlocked: false,
    criteria: (gameState) => {
      const { upgrades } = gameState
      return upgrades.goldMine.amount >= upgrades.goldMine.maxAmount
    },
  },
]

export function generateAchievements() {
  const achievements: ShopAchievements = {}
  baseAchievements.forEach((achievement) => {
    achievements[achievement.id] = { ...achievement }
  })

  return achievements
}

export function getProgress(achievements: ShopAchievements) {
  const completed = Object.values(achievements).filter((a) => a.unlocked).length
  const total = Object.values(achievements).length

  return { completed, total }
}
export const shopAchievements = generateAchievements()
