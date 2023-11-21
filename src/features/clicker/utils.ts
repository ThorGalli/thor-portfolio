import { Buyable, ShopUpgrades, ShopItems } from './clickerTypes'
import { ShopAchievements } from './data/achievements'

export function hasAllRequirements(
  buyable: Buyable,
  gameProgress: {
    upgrades: ShopUpgrades
    items: ShopItems
    achievements: ShopAchievements
  },
) {
  if (!buyable.requirements) return true
  return buyable.requirements.every((req) => {
    switch (req.source) {
      case 'achievement':
        return gameProgress.achievements[req.id].unlocked
      case 'item':
        return gameProgress.items[req.id].amount >= req.amount
      case 'upgrade':
        return gameProgress.upgrades[req.id].amount >= req.amount
      default:
        return false
    }
  })
}
