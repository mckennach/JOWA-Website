'use client'

import { useLenis } from 'lenis/react'
import _gsap from 'gsap'
import _ScrollTrigger from 'gsap/ScrollTrigger'

import { useEffect, useLayoutEffect } from 'react'

export function ScrollTriggerConfig() {
  useLayoutEffect(() => {
    _gsap.registerPlugin(_ScrollTrigger)
    _ScrollTrigger.clearScrollMemory('manual')
    _ScrollTrigger.defaults({
      // markers: process.env.NODE_ENV === "development",
    })
  }, [])

  const lenis = useLenis(_ScrollTrigger.update)
  useEffect(() => _ScrollTrigger.refresh(), [lenis])

  return null
}
