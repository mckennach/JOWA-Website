'use client'

import { useState } from 'react'
import Image from 'next/image'
import CustomIcons from '../custom-icons'
import { Container } from '../craft'
import { imageLoader } from '@/src/lib/utils'
export default function Loading({}) {
  const [hasLoaded, setHasLoaded] = useState(false)
  return (
    <div className="fixed left-0 top-0 z-[999] h-screen w-screen">
      <Container className="relative z-10 flex h-full w-full animate-fade-out items-center justify-between bg-background">
        <div className="basis-1/2">
          <CustomIcons
            name="logo"
            className="w-[381px] text-cream"
            color="hsla(39, 78%, 93%, 1)"
          />
        </div>
        <div className="basis-1/2">
          <p className="font-maisonNeue text-[32px] text-cream">
            Where your vision unfolds.
          </p>
        </div>
      </Container>
      <div className="absolute left-0 top-0 z-0 h-screen w-screen">
        <Image
          src="https://jowadotca.wpcomstaging.com/wp-content/uploads/2024/10/af664baaf2b4e5165685ce6efe90852a-1.png?w=3840&q=75"
          alt="alt"
          fill={true}
          priority={true}
          style={{
            objectFit: 'cover',
          }}
          loader={imageLoader}
        />
      </div>
    </div>
  )
}
