import clsx from 'clsx'

type ArticleSectionProps = {
  subtitle?: string
  time?: string | React.ReactNode
  children?: React.ReactNode
  className?: string
  job?: boolean
  footer?: React.ReactNode
}

export default function ArticleSection({
  subtitle,
  time,
  children,
  className,
  job,
  footer,
}: ArticleSectionProps) {
  return (
    <section
      className={clsx(
        'profile-section overflow-clip text-slate-300',
        className,
        job ? 'p-0' : 'p-2',
      )}
    >
      {!!subtitle && (
        <div className={clsx(job ? 'bg-white bg-opacity-5 p-2' : '')}>
          <h3 className="profile-subtitle w-full text-yellow-200">
            {subtitle}
          </h3>
          {!!time && <div className="profile-time">{time}</div>}
        </div>
      )}

      <div className={clsx(job ? ' p-2' : '')}>{!!children && children}</div>
      {!!footer && <div className="px-2 pb-2">{footer}</div>}
    </section>
  )
}
