'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { Section, Container } from '@/components/craft'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'
import { imageLoader } from '@/src/lib/utils'
import { HomeHomeContent } from '@/src/gql/graphql'
import { Text } from '@/src/components/ui/text'
import useLoading from '../loading/useLoading'

gsap.registerPlugin(ScrollTrigger)

type HomeAboutProps = {
  data: HomeHomeContent;
	noLoading?: boolean;
}

export default function HomeAbout({ data, noLoading }: HomeAboutProps) {
  const containerRef = useRef(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef(null)
  const contentRef = useRef(null)
  const image = data?.image?.node
	const { hasLoaded } = useLoading();

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

      if (imageRef.current === null) return
      mm.add('(min-width: 1024px)', () => {
        gsap.set(imageRef.current, {
          yPercent: 100,
        })

        gsap.set(textRef?.current, {
          opacity: 0,
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `bottom+=${window.innerHeight} bottom`,
            pin: true,
            pinSpacing: false,
            scrub: 1,
          },
        })

        tl.set(textRef.current, {
          opacity: 1,
        })

        tl.to(
          imageRef.current,
          {
            yPercent: 0,
            opacity: 1,
          },
          '<'
        )

        tl.to(imageRef.current, {
          yPercent: 0,
          duration: 2,
        })
      })
    },
    {
      scope: containerRef,
			dependencies: [hasLoaded],
      revertOnUpdate: true,
    }
  )

  return (
    <Section className="top-fade">
      <Container ref={containerRef} className="py-14 lg:h-[200vh] lg:py-0">
        <div
          className={cn(
            'space-around flex flex-col-reverse gap-14 lg:flex-row'
          )}
        >
          <div className="block basis-full items-center lg:basis-1/2 lg:py-40">
            <div className="mx-auto max-w-[280px] lg:max-w-[55%]">
              <div className="relative aspect-[476/650]" ref={imageRef}>
                <Image
                  src={image?.mediaItemUrl ?? ''}
                  alt={image?.altText ?? ''}
                  fill={true}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  sizes="(max-width: 476px) 100vw, 476px"
                  loader={imageLoader}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center py-0 lg:basis-1/2 lg:py-40">
            <div
              className="ml-auto mr-0 max-w-[780px] space-y-8"
              ref={contentRef}
            >
              <div
                className="body-xl-fluid"
                dangerouslySetInnerHTML={{
                  __html: data?.description || '',
                }}
              />
              {data?.ctaLink && data?.ctaLink?.url && data?.ctaLink?.title && (
                <div>
                  <Link
                    href={data?.ctaLink?.url ?? ''}
                    className="group flex items-center gap-4"
                  >
                    <Text type="label">{data?.ctaLink?.title}</Text>
                    <svg
                      width="40"
                      height="8"
                      viewBox="0 0 40 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300 group-hover:translate-x-2 group-hover:transform"
                    >
                      <path
                        d="M39.3536 4.35355C39.5488 4.15829 39.5488 3.84171 39.3536 3.64645L36.1716 0.464466C35.9763 0.269204 35.6597 0.269204 35.4645 0.464466C35.2692 0.659728 35.2692 0.976311 35.4645 1.17157L38.2929 4L35.4645 6.82843C35.2692 7.02369 35.2692 7.34027 35.4645 7.53553C35.6597 7.7308 35.9763 7.7308 36.1716 7.53553L39.3536 4.35355ZM0 4.5H39V3.5H0V4.5Z"
                        fill="#3F261D"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="fixed bottom-10 z-40 hidden lg:left-12 lg:block"
          ref={textRef}
        >
          <Link href="/about">
            <Text
              type="label"
              className="inline-flex items-center gap-2 text-cream"
            >
              ABOUT US
            </Text>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
