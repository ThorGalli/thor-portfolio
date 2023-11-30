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
  loading: boolean
  me: unknown
}

export function MeProvider({ children }: { children: React.ReactNode }) {
  const [showAdmin, setShowAdmin] = useState(false)
  const [me, setMe] = useState(null)
  const [loading, setLoading] = useState(true)

  const { status } = useSession()

  async function fetchPermission() {
    setLoading(true)
    try {
      const jsonResponse = await fetch('/api/users/me', {
        method: 'GET',
        cache: 'no-store',
      })
      const response = await jsonResponse.json()

      if (response?.data) {
        setShowAdmin(response.data.admin)
        setMe(response.data)
      } else {
        setShowAdmin(false)
        setMe(null)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPermission()
    }
  }, [status])

  const contextValues = useMemo(() => {
    return { showAdmin, me, loading }
  }, [showAdmin, me, loading])

  return (
    <MeContext.Provider value={contextValues}>{children}</MeContext.Provider>
  )
}

const MeContext = createContext<MeProps>({
  showAdmin: false,
  loading: true,
  me: null,
})

export function useMe() {
  return useContext(MeContext)
}
