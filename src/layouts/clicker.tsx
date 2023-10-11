import MainCoin from '@/components/coins/mainCoin'
import ItemList from '@/components/shops/itemList'
import UpgradeList from '@/components/shops/upgradeList'

export default function ClickerGame() {
  return (
    <div className="flex flex-row justify-between gap-5">
      <UpgradeList />
      <MainCoin />
      <ItemList />
    </div>
  )
}
