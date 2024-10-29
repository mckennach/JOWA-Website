'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { Section, Container, cn } from '@/components/craft'
import { MEDIA_QUERY } from '@/src/lib/queries'
import { useCookies } from 'next-client-cookies'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { imageLoader } from '@/src/lib/utils'
import { HomeHomeContent } from '@/src/gql/graphql'
import { Text } from '@/src/components/ui/text'

type HomeContentProps = {
  data: HomeHomeContent
}

export default function HomeContent({ data }: HomeContentProps) {
  const containerRef = useRef(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef(null)
  const image = data?.image?.node

  useGSAP(
    () => {
      if (imageRef.current === null) return
      console.log(imageRef.current.offsetHeight)

      gsap.set(imageRef.current, {
        yPercent: 100,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '-=100% top',
          end: `+=25% -=${imageRef.current.offsetHeight - 50}px`,
          pin: false,
          scrub: 1,
        },
      })

      tl.to(imageRef.current, {
        yPercent: 0,
        opacity: 1,
      })
    },
    {
      scope: containerRef,
    }
  )

  return (
    <Section className="sticky top-0">
      <Container ref={containerRef}>
        <div
          className={cn('space-around flex flex-col-reverse gap-4 md:flex-row')}
        >
          <div className="block basis-full items-center pb-10 pt-8 md:basis-1/2 md:py-40">
            <div className="mx-auto max-w-[280px] md:max-w-[476px]">
              <div className="relative aspect-[476/650]" ref={imageRef}>
                <Image
                  src={image?.mediaItemUrl ?? ''}
                  alt={image?.altText ?? ''}
                  fill={true}
                  style={{
                    objectFit: 'cover',
                  }}
                  loader={imageLoader}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center py-8 md:basis-1/2 md:py-40">
            <div className="max-w-[750px] space-y-8 md:pr-28" ref={contentRef}>
              <div
                className="space-y-8 text-[32px] text-foreground"
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
      </Container>
    </Section>
  )
}
