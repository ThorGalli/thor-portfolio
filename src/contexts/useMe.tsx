import { useSession } from 'next-auth/react'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type MeProps = {
  showAdmin: boolean
  me: unknown
}

export function MeProvider({ children }: { children: React.ReactNode }) {
  const [showAdmin, setShowAdmin] = useState(false)

  const { data, status } = useSession()

  async function fetchPermission() {
    try {
      const response = await (
        await fetch('/api/users/me', { method: 'GET' })
      ).json()
      if (response?.data?.admin) setShowAdmin(true)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPermission()
    }
  }, [status])

  const contextValues = useMemo(() => {
    return { showAdmin, me: data }
  }, [showAdmin, data])

  return (
    <MeContext.Provider value={contextValues}>{children}</MeContext.Provider>
  )
}

const MeContext = createContext<MeProps>({
  showAdmin: false,
  me: null,
})

export function useMe() {
  return useContext(MeContext)
}
