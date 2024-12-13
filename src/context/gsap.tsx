'use client'

import Lenis from '@studio-freight/lenis/types'
import _gsap from 'gsap'
import _ScrollTrigger from 'gsap/ScrollTrigger'
import React, { createContext, useContext, useRef } from 'react'

_gsap.registerPlugin(_ScrollTrigger)

export type GsapContextProps = React.RefObject<HTMLDivElement>

export interface LenisRef {
  wrapper?: HTMLElement
  content?: HTMLElement
  lenis?: Lenis
}

export const GsapContext = createContext<GsapContextProps | null>(null)
export function GsapProvider({ children }: { children: React.ReactNode }) {
  const gsapRef = useRef<HTMLDivElement>(null)

  return <GsapContext.Provider value={gsapRef}>{children}</GsapContext.Provider>
}

export const useGsapContext = () => useContext(GsapContext)
