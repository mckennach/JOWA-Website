'use client'

import { useRef, forwardRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { Section, Container } from '@/components/craft'
import { BlockData } from '..'
import { imageLoader } from '@/src/lib/utils'
import { useIntersectionObserver } from 'usehooks-ts'
import { zeroPad } from '@/src/lib/utils'

gsap.registerPlugin(useGSAP)

type ScrollSlideShowProps = {
  block: BlockData
}

export default function ScrollSlideShow({ block }: ScrollSlideShowProps) {
  const { innerBlocks } = block
  const container = useRef(null)
  const galleryRefs = useRef<Array<HTMLDivElement | null>>([])
  const [count, setCount] = useState<number>(1)
  const [caption, setCaption] = useState<string>(
    innerBlocks[0].attributes.caption ?? ''
  )
  const [isActive, setIsActive] = useState<boolean>(true)

  useGSAP(
    () => {
      const panels = galleryRefs.current
      if (panels.length === 0 || !container.current) return

      gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80px',
          end: 'bottom bottom',
          onLeave: () => {
            setIsActive(false)
          },
          onEnterBack: () => {
            setIsActive(true)
          },
        },
      })

      panels.forEach((panel, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top 80px',
            end: i === panels.length - 1 ? 'bottom bottom' : 'bottom 80px',
            pin: true,
            pinSpacing: false,
            scrub: 2,
            onEnter: () => {
              setCaption(innerBlocks[i].attributes.caption ?? '')
              setCount(i + 1)
            },
            onEnterBack: () => {
              setCaption(innerBlocks[i].attributes.caption ?? '')
              setCount(i + 1)
              if (i !== panels.length - 1) {
                gsap.set(panel, {
                  opacity: 1,
                })
              }
            },
            onLeave: () => {
              if (i !== panels.length - 1) {
                gsap.set(panel, {
                  opacity: 0,
                })
              }
            },
          },
        })
      })
    },
    { scope: container }
  )

  return (
    <Section className="relative">
      <Container ref={container} className="overflow-hidden">
        {innerBlocks.map((block, index) => {
          const image = block.attributes
          return (
            <Slide
              key={index}
              index={index}
              image={{
                url: image?.url,
                alt: image?.alt,
              }}
              setCaption={setCaption}
              setCount={setCount}
              ref={(el) => {
                galleryRefs.current[index] = el
              }}
            />
          )
        })}
        {/* <div className="bg-background h-[150px] absolute bottom-0 pl-16 z-50 w-full"></div> */}
        {isActive && (
          <div className="fixed bottom-10 z-30 pl-8 text-secondary md:pl-16">
            <p>
              {zeroPad(count)}/{zeroPad(innerBlocks.length)}
            </p>
            <p className="uppercase">{caption}</p>
          </div>
        )}
      </Container>
    </Section>
  )
}

type SlideProps = {
  image: { url?: string; alt?: string }
  index: number
  setCaption: (caption: string) => void
  setCount: (count: number) => void
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
  ({ image, index, setCaption, setCount }, ref) => {
    const { isIntersecting, ref: intersectRef } = useIntersectionObserver({
      threshold: 0.5,
    })

    return (
      <div
        ref={ref}
        data-index={index}
        key={index}
        className="not-prose h-[130vh]"
      >
        <div
          className="image relative"
          style={{
            height: 'calc(100vh - 80px)',
          }}
          ref={intersectRef}
        >
          <Image
            src={image?.url ?? ''}
            alt={image.alt ?? ''}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            loader={imageLoader}
            priority={true}
          />
        </div>
      </div>
    )
  }
)

Slide.displayName = 'Slide'
