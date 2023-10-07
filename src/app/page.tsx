'use client'
import { useGameContext } from '@/contexts/useGameContext'

export default function Home() {
  const {
    items,
    baseIncome,
    totalCoins,
    clickCoin,
    buyItem,
    getAdjustedItemPrice,
  } = useGameContext()

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-col items-center justify-start gap-5">
          <button
            onClick={() => clickCoin()}
            className="rounded-md border-2 border-red-500 bg-slate-500 px-8 py-4 active:bg-slate-700"
          >
            Click
          </button>
          <div>BaseIncome: {baseIncome}</div>
          <div>Coins: {totalCoins}</div>
        </div>
        <div>
          {items.map((item) => {
            const adjustedPrice = getAdjustedItemPrice(item)
            return (
              <div
                key={item.name}
                className="flex flex-row items-center justify-end gap-5"
              >
                <div>
                  {item.name} x{item.amount}
                </div>
                <button
                  onClick={() => buyItem(item)}
                  // tailwind classes for a button to use a colorscheme around gray.500, ajust hover, active, and disabled colors
                  className="rounded-md border-2 border-gray-500 bg-gray-500 px-8 py-4 hover:bg-gray-400 active:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-900 disabled:text-gray-500"
                  disabled={totalCoins < adjustedPrice}
                >
                  Buy <br /> {adjustedPrice} coins
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
