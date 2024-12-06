'use server'

import { cookies } from 'next/headers'

export async function getCookie(key: string) {
  const cookieStore = await cookies()

  return cookieStore.get(key)
}

export async function createCookie(key: string, value: string) {
  const cookieStore = await cookies()

  cookieStore.set(key, value, {
    maxAge: 36000,
  })
}

export async function deleteCookie(key: string) {
  ;(await cookies()).delete(key)
}
