import { useRef } from 'react'

type BuyableListProps = {
  title: string | JSX.Element
  list: JSX.Element[]
  mobile?: boolean
}

export default function BuyableList({ title, list, mobile }: BuyableListProps) {
  const headerRef = useRef<HTMLHeadElement>(null)
  const headerHeight = headerRef.current?.clientHeight ?? 0
  const listHeight = 'calc(100vh - ' + headerHeight + 'px - 5rem)'
  return (
    <div
      className={
        'h-fit w-full flex-col rounded-[14px] border-slate-800 bg-slate-800  first-line:flex ' +
        (mobile ? ' flex ' : ' hidden lg:flex')
      }
    >
      <header
        ref={headerRef}
        className={
          'h-fit rounded-md bg-slate-700 px-2 py-2 text-center text-yellow-200 ' +
          (mobile ? ' ' : ' m-2 ')
        }
      >
        {title}
      </header>
      <div
        className={
          'flex flex-col gap-2 overflow-y-auto rounded-[14px]' +
          (mobile ? ' ' : ' px-2 pb-2 ')
        }
        style={{ maxHeight: listHeight }}
      >
        {list}
      </div>
    </div>
  )
}
