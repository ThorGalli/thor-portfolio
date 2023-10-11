export default function BuyableList({ list }: { list: JSX.Element[] }) {
  return (
    <div className="flex flex-col gap-2 rounded-[14px] bg-slate-800 p-2">
      {list}
    </div>
  )
}
