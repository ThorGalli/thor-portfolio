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
  const [checkAgain, setCheckAgain] = useState(false)

  const { data, status } = useSession()

  async function fetchPermission() {
    setLoading(true)
    try {
      const jsonResponse = await fetch('/api/users/me', {
        method: 'GET',
        cache: 'no-cache',
      })
      const response = await jsonResponse.json()
      console.log('user:', response)
      if (response?.data?.admin) setShowAdmin(true)
      else setShowAdmin(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (checkAgain) {
      console.log('check again')
      setCheckAgain(false)
      fetchPermission()
    }
  }, [checkAgain])

  useEffect(() => {
    if (status === 'authenticated') {
      setTimeout(() => {
        fetchPermission()
      }, 1000)
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
