'use client'

import _Tempus from 'tempus'
import _gsap from 'gsap'

import { useLayoutEffect } from 'react'

import { ScrollTriggerConfig } from './scroll-trigger'

export function GSAP({ scrollTrigger = false }) {
  useLayoutEffect(() => {
    _gsap.defaults({ ease: 'none' })

    // merge rafs
    _gsap.ticker.lagSmoothing(0)
    _gsap.ticker.remove(_gsap.updateRoot)
    _Tempus?.add((time: number) => {
      _gsap.updateRoot(time / 1000)
    }, { priority: 1 });
  }, [])

  return scrollTrigger && <ScrollTriggerConfig />
}
