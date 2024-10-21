'use client'

import { useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { useEffect, useLayoutEffect } from 'react'

export function ScrollTriggerConfig() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.clearScrollMemory('manual')
    ScrollTrigger.defaults({
      // markers: process.env.NODE_ENV === "development",
    })
  }, [])

  const lenis = useLenis(ScrollTrigger.update)
  useEffect(() => ScrollTrigger.refresh(), [lenis])

  return null
}
