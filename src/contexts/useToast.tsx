import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

export type ToastData = {
  id?: string
  message: string | React.ReactNode
  variant?: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}

export type Toast = {
  id: string
  onClose: () => void
} & ToastData

type ToastContextProps = {
  toast: (toastData: ToastData) => void
  toastList: Toast[]
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastList, setToastList] = useState<Toast[]>([])

  const toast = useCallback((toastData: ToastData) => {
    const { message, variant, duration, id } = toastData
    const toastID = new Date().getTime() + (id ?? '-key')
    const newToast: Toast = {
      id: toastID,
      message,
      variant: variant ?? 'success',
      onClose: () => removeToast(toastID),
      duration: duration ?? 5000,
    }
    setToastList((prev) => [...prev, newToast])
  }, [])

  const removeToast = useCallback(
    (id: string) => {
      setToastList((prev) => prev.filter((toast) => toast.id !== id))
    },
    [setToastList],
  )

  const contextValues = useMemo(() => {
    return { toast, toastList }
  }, [toast, toastList])

  return (
    <ToastContext.Provider value={contextValues}>
      {children}
    </ToastContext.Provider>
  )
}

const ToastContext = createContext<ToastContextProps>({
  toast: () => null,
  toastList: [],
})

export function useToast() {
  return useContext(ToastContext)
}
