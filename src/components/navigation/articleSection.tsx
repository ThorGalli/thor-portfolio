type ArticleSectionProps = {
  subtitle?: string
  time?: string
  children?: React.ReactNode
  className?: string
}

export default function ArticleSection({
  subtitle,
  time,
  children,
  className,
}: ArticleSectionProps) {
  return (
    <section className={' profile-section text-slate-300 ' + className}>
      {!!subtitle && (
        <h3 className="profile-subtitle text-yellow-200">{subtitle}</h3>
      )}
      {!!time && <p className="profile-time">{time}</p>}
      {!!children && children}
    </section>
  )
}
