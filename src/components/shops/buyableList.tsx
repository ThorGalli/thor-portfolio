export default function BuyableList({
  title,
  list,
  tight,
}: {
  title: string
  list: JSX.Element[]
  tight?: boolean
}) {
  return (
    <div
      className={
        'flex h-fit w-full flex-col gap-2 rounded-[14px] border-slate-800  bg-slate-800 ' +
        (tight ? '' : ' border-8 ')
      }
    >
      <header className="h-fit rounded-md bg-slate-700 px-2 py-4 text-center text-yellow-200">
        {title}
      </header>
      <div className="flex flex-col gap-2 rounded-[14px]">{list}</div>
    </div>
  )
}
