'use client'
import ToastBox from './toastBox'
import { useToast } from '@/contexts/useToast'

export default function ToastHolder() {
  const { toastList } = useToast()

  const toastComponents = toastList.map((toast) => (
    <ToastBox key={toast.id} toast={toast} />
  ))
  return (
    <div className="absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 flex-col gap-2 pb-2 lg:bottom-0">
      {toastComponents}
    </div>
  )
}
