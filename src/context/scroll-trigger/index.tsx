'use client'

import { ReactLenis } from 'lenis/react'
import React, { createContext, useContext, useRef } from 'react'
import { LenisRef } from '../gsap'

import { GSAP } from './gsap'

interface ScrollContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export type ScrollContextProps = React.RefObject<LenisRef>

export const ScrollContext = createContext<ScrollContextProps | null>(null)

export function ScrollProvider({ children }: ScrollContainerProps) {
  const lenisRef = useRef(null)

  return (
    <ScrollContext.Provider value={lenisRef}>
      <ReactLenis root ref={lenisRef}>
        {children}
        <GSAP scrollTrigger={true} />
      </ReactLenis>
    </ScrollContext.Provider>
  )
}

export const useScrollContext = () => useContext(ScrollContext)
