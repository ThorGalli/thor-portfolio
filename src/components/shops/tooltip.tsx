import { Upgrade } from '@/features/clicker/clickerTypes'

export default function Tooltip({
  ref,
  upgrade,
  style = {},
}: {
  ref?: React.RefObject<HTMLDivElement>
  upgrade: Upgrade
  mobile?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div
      ref={ref}
      className={
        'z-10 mt-1 flex w-full flex-col overflow-clip border-t border-white border-opacity-20 pt-1  text-sm'
      }
      style={style}
    >
      <p className="whitespace-break-spaces py-1 leading-none text-teal-200">
        {upgrade.description}
      </p>
    </div>
  )
}
