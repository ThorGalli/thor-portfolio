import { useRef } from 'react'
import { clsx } from 'clsx'
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
        'h-fit w-full flex-col rounded-[14px] border-slate-800 bg-slate-800 first-line:flex ' +
        (mobile ? ' flex gap-2 ' : ' hidden lg:flex')
      }
    >
      <header
        ref={headerRef}
        className={clsx('header-slate', mobile ? ' ' : ' m-2 ')}
      >
        {title}
      </header>
      <div
        className={
          'flex flex-col gap-2 overflow-y-auto' + (mobile ? ' ' : ' px-2 pb-2 ')
        }
        style={{ maxHeight: listHeight }}
      >
        {list.length > 0 ? (
          list
        ) : (
          <div className="flex flex-col items-center">
            <p>Nothing here 😵</p>
            <p>Try clicking something else</p>
          </div>
        )}
      </div>
    </div>
  )
}
