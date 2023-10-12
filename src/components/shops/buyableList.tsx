export default function BuyableList({
  title,
  list,
}: {
  title: string
  list: JSX.Element[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="h-fit rounded-[14px] border-8 border-slate-800 bg-slate-950 px-2 py-4 text-center text-yellow-200">
        {title}
      </p>
      <div className="flex flex-col gap-2 rounded-[14px] bg-slate-800 p-2">
        {list}
      </div>
    </div>
  )
}
