'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { Section, Container, cn } from '@/components/craft'
import { BlockData } from '..'
import { MEDIA_QUERY } from '@/src/lib/queries'
import { useCookies } from 'next-client-cookies'
import { useQuery } from '@apollo/client'
import { imageLoader } from '@/src/lib/utils'

gsap.registerPlugin(useGSAP)

type MediaTextProps = {
  data: BlockData
}

export default function MediaText({ data }: MediaTextProps) {
  const containerRef = useRef(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef(null)
  // extracting our cookie
  const { mediaId } = data.attributes
  const { data: media } = useQuery(MEDIA_QUERY, {
    variables: { id: mediaId },
    context: {
      header: {
        'Content-Type': 'application/json',
      },
    },
  })

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
                  src={media?.mediaItem.mediaItemUrl ?? ''}
                  alt={media?.mediaItem.altText ?? ''}
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
            <div className="max-w-[750px] md:pr-28" ref={contentRef}>
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: data?.innerBlocks[0]?.htmlContent || '',
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
