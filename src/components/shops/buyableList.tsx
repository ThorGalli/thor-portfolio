export default function BuyableList({
  title,
  list,
}: {
  title: string
  list: JSX.Element[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <header className="list-header">{title}</header>
      <div className="list">{list}</div>
    </div>
  )
}
