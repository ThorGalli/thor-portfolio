import NavButton from '@/components/navigation/navButton'

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navList = [
    <NavButton key="home" route="/" label="Home" />,
    <NavButton key="clicker" route="/clicker" label="Clicker" />,
    <NavButton key="mineSweeper" route="/minesweeper" label="Mine Sweeper" />,
    <NavButton key="options" route="/options" label="Options" />,
  ]

  return (
    <div className="mt-[3.5rem] w-full bg-gray-900">
      <div
        id="navbar-wrapper"
        className="fixed top-0 z-10 flex w-full justify-center bg-slate-800"
      >
        <div className="flex h-[3.5rem] w-screen max-w-screen-md flex-row justify-center">
          {navList}
        </div>
      </div>
      <div
        id="content-wrapper"
        className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-screen-2xl bg-slate-900 p-2 shadow-[0_0_30px_10px] shadow-slate-950"
      >
        {children}
      </div>
    </div>
  )
}
