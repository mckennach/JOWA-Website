import { getCookie } from '@/src/lib/api/actions'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { useEffect, useState } from 'react'
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
