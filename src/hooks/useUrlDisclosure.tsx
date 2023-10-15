'use client'
import { useRouter, useSearchParams } from 'next/navigation'

export function useUrlDisclosure(param: string) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const isOpen = searchParams.get(param) === 'true'

  function onOpen() {
    router.push(`?${param}=true`)
  }

  function onClose() {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete(param)
    router.push('?' + newSearchParams.toString())
  }

  return { isOpen, onOpen, onClose }
}
