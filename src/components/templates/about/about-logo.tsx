'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Section, Container } from '../../craft'
import { Text } from '../../ui/text'
import { Page, Service } from '@/src/gql/graphql'
import CustomIcons from '../../custom-icons'

type AboutLogoProps = {
  page: Page
}

export default function AboutLogo({ page }: AboutLogoProps) {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (containerRef.current === null) return
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
    },
    {
      scope: containerRef,
    }
  )

  return (
    <Section
      className="relative flex items-center justify-center lg:py-48"
      ref={containerRef}
    >
      <Container>
        <div className="relative flex w-full flex-col gap-8 px-4 py-24 lg:px-0">
          <div className="mx-auto w-full lg:max-w-[800px]">
            <CustomIcons
              name="about-logo"
              className="mx-auto w-full lg:max-w-[800px]"
            />
          </div>
          <div className="ml-0 max-w-[296px] lg:absolute lg:bottom-7 lg:left-12 lg:px-0">
            <Text className="text-[16px] leading-[24px] text-genmaicha">
              {page?.aboutPage?.logoDescription}
            </Text>
          </div>
        </div>
        <div className="h-[80vh]" />
      </Container>
    </Section>
  )
}
