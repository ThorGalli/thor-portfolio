import DeleteGameDataButton from '@/components/settings/deleteGameDataButton'
import NavbarLayout from '@/layouts/navbar'

export default function ClickerPage() {
  return (
    <NavbarLayout>
      <div className="flex justify-center">
        <DeleteGameDataButton />
      </div>
    </NavbarLayout>
  )
}
