import { useState } from 'react'
import { getCookie } from '@/src/lib/api/actions'
import { useEffect } from 'react'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
export default function useLoading() {
  const [hasLoaded, setHasLoaded] = useState(true)
  const [cookie, setCookie] = useState<RequestCookie>()
  useEffect(() => {
    const checkCookie = async () => {
      const loaded = await getCookie('animation-loaded')
      setCookie(loaded)
      if (loaded) {
        setHasLoaded(true)
      }
    }
    checkCookie()
  }, [])

  return { hasLoaded, setHasLoaded, cookie }
}
