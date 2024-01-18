type ArticleWindowProps = {
  id: string
  title: string | React.ReactNode
  children: React.ReactNode
  className?: string
}

export default function ArticleWindow({
  id,
  title,
  children,
  className,
}: ArticleWindowProps) {
  return (
    <article id={id} className={' profile-article ' + className}>
      <h2 className="text-3xl font-bold">{title}</h2>
      {children}
    </article>
  )
}
