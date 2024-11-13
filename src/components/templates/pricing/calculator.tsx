'use client'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

import Link from 'next/link'
import { Section, Container } from '../../craft'
import { Text } from '../../ui/text'
import {
  Node,
  AcfMediaItemConnectionEdge,
  Page,
  Service,
} from '@/src/gql/graphql'
import Image from 'next/image'
import { imageLoader } from '@/src/lib/utils'
import PricingCalculatorForm from './calculator-form'

gsap.registerPlugin(ScrollTrigger)

type PricingCalculatorProps = {
  page: Page
}

export default function PricingCalculator({ page }: PricingCalculatorProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);

	const content = page?.pricing
  const [image, setImage] = useState<
    AcfMediaItemConnectionEdge['node'] | undefined
  >(content?.types?.laneway?.visualContent?.image?.node)

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize);
		document.documentElement.style.setProperty('--pricing-bg', `hsl(var(--background))`);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      if (containerRef.current === null) return
      mm.add('(min-width: 1024px)', () => {
				if(formRef.current && imageRef.current && formRef?.current?.clientHeight) {
					gsap.to(formRef.current, {
						y: () => (window.innerHeight - (formRef?.current?.clientHeight as number) - 64),
						scrollTrigger: {
							trigger: containerRef.current,
							start: () => "top " + 80, 
							end: `bottom bottom`,
							pin: true,
							pinSpacing: false,
							scrub: 1,
							onEnterBack: () => {
								document.documentElement.style.setProperty('--pricing-bg', `hsl(var(--background))`);
							},
							onLeave: () => {
								document.documentElement.style.setProperty('--pricing-bg', ``);
							}
						},
					})
	
				}
      })
    },
    {
      scope: containerRef,
    }
  )

  return (
    <Section className="grid lg:grid-cols-2 border-t" ref={containerRef}>
      <Container className="flex flex-col gap-12 py-32" ref={formRef}>
        <header className="space-y-8">
          <Text type="title1" tag="h1" className="text-cream">
            {page?.pricing?.title ? page.pricing.title : page?.title}
          </Text>
          <Text type="body" tag="p">
            {content?.description}
          </Text>
        </header>
        <PricingCalculatorForm page={page} setImage={setImage} />
      </Container>
      <div className="hidden lg:block" ref={imageRef}>
        <div className="relative h-screen w-full overflow-hidden">
          <Image
            src={image?.sourceUrl ?? ''}
            alt={image?.altText ?? ''}
            fill={true}
            loader={imageLoader}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            layout="fill"
          />
        </div>
      </div>
    </Section>
  )
}
