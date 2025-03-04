'use client'

import { AcfMediaItemConnectionEdge } from '@/src/gql/graphql'
import { createCookie } from '@/src/lib/api/actions'
import { cn, imageLoader } from '@/src/lib/utils'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { Maybe } from '../../../gql/graphql'
import { Container } from '../../craft'
import CustomIcons from '../../custom-icons'
// import { Project } from '@/src/gql/graphql'
import { gsap, ScrollTrigger } from 'gsap/all'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import useLoading from './useLoading'

gsap.registerPlugin(ScrollTrigger)

export default function LoadingScreen({
  text,
  image,
}: {
  text?: Maybe<string>
  image?: Maybe<AcfMediaItemConnectionEdge>
}) {
  const mm = gsap.matchMedia()
  const { hasLoaded, setHasLoaded } = useLoading()
  const [hasLoadedInternal, setHasLoadedInternal] = useState(false)
  const [modifiedDate, setModifiedDate, removeDate] = useLocalStorage(
    'loading-date',
    false
  )
  const pathname = usePathname()
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const logoRef = useRef(null)
  const logoTextRef = useRef(null)

  useGSAP(
    () => {
      if (containerRef.current === null) return

      gsap.set(logoTextRef.current, {
        opacity: 0,
      })

      gsap.set(textRef.current, {
        opacity: 0,
      })

      gsap.set(containerRef.current, {
        opacity: 1,
        backgroundColor: 'hsla(70, 14%, 67%, 1)',
      })

      const animation = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            setTimeout(() => {
              setHasLoaded(true)
              createCookie('animation-loaded', 'true')
            }, 100)
          },
        })

        mm.add('(min-width: 1024px)', () => {
          tl.to(textRef.current, {
            opacity: 1,
            duration: 0.7,
            stagger: 0.25,
          })
        })

        tl.to(
          containerRef.current,
          {
            backgroundColor: 'hsla(70, 14%, 67%, 0)',
            duration: 0.7,
            stagger: 0.25,
          },
          '<+=0.5'
        )

        tl.to(logoRef.current, {
          opacity: 0,
          stagger: 0.25,
        })

        mm.add('(max-width: 1024px)', () => {
          tl.to(
            textRef.current,
            {
              opacity: 1,
              duration: 0.7,
              stagger: 0.25,
            },
            '>'
          )
        })

        tl.to(textRef.current, {
          opacity: 0,
        })

        tl.to(
          containerRef.current,
          {
            opacity: 0,
          },
          '<+=0.25'
        )
      }
      setTimeout(animation, 200)
    },
    {
      scope: containerRef,
      revertOnUpdate: true,
    }
  )

  if (pathname !== '/') {
    return null
  }

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-[999] h-dvh w-screen bg-background transition-all duration-300 ease-linear',
        hasLoaded
          ? 'pointer-events-none opacity-0'
          : 'pointer-events-auto opacity-100'
      )}
    >
      <Container
        className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-y-8 bg-background lg:flex-row lg:justify-between"
        ref={containerRef}
      >
        <div
          className="absolute left-12 top-8 mx-auto max-w-[85%] opacity-0 lg:max-w-full"
          ref={logoTextRef}
        >
          <CustomIcons name="logo-text" color="hsla(39, 78%, 93%, 1)" />
        </div>
        <div className="lg:basis-1/2" ref={logoRef}>
          <CustomIcons
            name="logo"
            className="w-[381px] text-cream"
            color="hsla(39, 78%, 93%, 1)"
          />
        </div>
        <div
          className="absolute opacity-0 lg:relative lg:basis-1/2"
          ref={textRef}
        >
          <p className="font-maisonNeue text-[32px] text-cream">
            {text ?? 'Where your vision unfolds.'}
          </p>
        </div>
      </Container>
      <div
        className="absolute left-0 right-0 top-0 z-0 mx-auto h-dvh w-screen"
        ref={imageRef}
      >
        <Image
          src={image?.node?.sourceUrl ?? ''}
          alt={image?.node?.altText ?? ''}
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
