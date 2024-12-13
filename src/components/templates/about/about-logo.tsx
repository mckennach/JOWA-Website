'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useEffect, useRef } from 'react'

import { Page } from '@/src/gql/graphql'
import { Container, Section } from '../../craft'
import CustomIcons from '../../custom-icons'
import { Text } from '../../ui/text'

gsap.registerPlugin(ScrollTrigger)

type AboutLogoProps = {
  page: Page
}

export default function AboutLogo({ page }: AboutLogoProps) {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      if (containerRef.current === null) return
      mm.add('(min-width: 1024px)', () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `bottom+=${window.innerHeight} bottom`,
            pin: true,
            pinSpacing: false,
            scrub: 1,
          },
        })
      })
    },
    {
      scope: containerRef,
    }
  )

  return (
    <Section
      className="relative flex items-center justify-center"
      ref={containerRef}
    >
      <Container>
        <div className="relative flex w-full flex-col gap-8 px-4 py-24 lg:max-h-screen lg:min-h-screen lg:px-0 lg:py-0">
          <div className="mx-auto w-full lg:max-w-[800px] lg:py-48">
            <CustomIcons
              name="about-logo"
              className="mx-auto w-full lg:max-w-[800px]"
            />
          </div>
          <div className="ml-0 max-w-[296px] lg:absolute lg:bottom-10 lg:left-12 lg:px-0">
            <Text className="text-[16px] leading-[24px] text-genmaicha">
              {page?.aboutPage?.logoDescription}
            </Text>
          </div>
        </div>
        <div className="lg:h-[80vh]" />
      </Container>
    </Section>
  )
}
