export const shopUgrades = {
  autoClicker: {
    id: 'autoClicker',
    name: 'Auto Clicker',
    description:
      'Auto clicks for you! Adds 1 click/s per upgrade.{br}Current clicks/s:',
    price: 50,
    multiplier: 1,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 2,
  },
  clickMultiplier: {
    id: 'clickMultiplier',
    name: 'Click Multiplier',
    description:
      'Multiplies click value by 2, including Auto Clicker clicks!{br}Current multiplier:',
    price: 120,
    multiplier: 2,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 4,
  },
  volunteerClicking: {
    id: 'volunteerClicking',
    name: 'Volunteer Clicking',
    description:
      'Volunteers will Auto Click too! Increases Auto Clicker income by 0.1% per Volunteer per upgrade.{br}Current % increase:',
    price: 180,
    multiplier: 0.001,
    amount: 0,
    maxAmount: 10,
    priceMultiplier: 5,
  },
}
