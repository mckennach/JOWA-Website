'use client'

import { Image } from '@/src/components/ui/image'
import { Text } from '@/src/components/ui/text'
import { MediaItem, Project } from '@/src/gql/graphql'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { useGSAP } from '@gsap/react'
import _gsap from 'gsap/all'
import { useRouter } from 'next/navigation'
import { forwardRef, useRef, useState } from 'react'
import {
  useIntersectionObserver,
  useMediaQuery,
  useResizeObserver,
} from 'usehooks-ts'
type FeaturedProjects = {
  projects: Project[]
  projectIds?: string[]
  noLoading?: boolean
}

export default function FeaturedProjectsDesktop({
  projects,
}: FeaturedProjects) {
  const [animationReady, setAnimationReady] = useState(false)
  const matches = useMediaQuery('(min-width: 768px)')
  const router = useRouter()
  const projectNodes = projects ?? []
  const container = useRef(null)
  const galleryRefs = useRef<Array<HTMLDivElement | null>>([])
  const [count, setCount] = useState<number>(1)
  const [activeItem, setActiveItem] = useState<Project>(projectNodes[0] ?? null)
  const [isActive, setIsActive] = useState<boolean>(true)
  const gsap = _gsap
  const size = useResizeObserver({
    ref: container,
    box: 'border-box',
  })

  useGSAP(
    () => {
      const panels = galleryRefs.current
      if (panels.length === 0 || !container.current || !animationReady) return
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
              setActiveItem(projectNodes[i])
              setCount(i + 1)
            },
            onEnterBack: () => {
              setActiveItem(projectNodes[i])
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
    {
      scope: container,
      dependencies: [size, matches, projectNodes, animationReady],
      revertOnUpdate: true,
    }
  )

  return (
    <div ref={container} className="relative overflow-hidden px-0">
      {projectNodes.map((project, index) => (
        <Slide
          key={index}
          index={index}
          setAnimationReady={setAnimationReady}
          image={project?.projectFields?.featuredImage?.node}
          ref={(el) => {
            galleryRefs.current[index] = el
          }}
        />
      ))}
      {isActive && (
        <div
          className="fixed bottom-10 z-30 cursor-pointer pl-8 text-secondary sm:pl-16"
          onClick={() => {
            router.push(`/work/${activeItem?.slug}`)
          }}
        >
          <Text type="label" tag="p" className="lg:leading-[21.25px]">
            {zeroPad(count)}/{zeroPad(projectNodes.length)}
          </Text>
          <Text type="label" tag="p" className="lg:leading-[21.25px]">
            {activeItem?.title}
          </Text>
        </div>
      )}
    </div>
  )
}

type SlideProps = {
  image?: MediaItem
  setAnimationReady: (value: boolean) => void
  index: number
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
  ({ image, setAnimationReady, index }, ref) => {
    const { ref: intersectRef } = useIntersectionObserver({
      threshold: 0.5,
    })

    return (
      <div
        ref={ref}
        data-index={index}
        key={index}
        className="not-prose h-[130vh] max-w-full w-full"
      >
        <div
          className="image relative w-full aspect-[500/700] max-w-[2500px] mx-auto lg:aspect-[1400/890] h-[calc(100vh-80px)]"
          ref={intersectRef}
        >
          <Image
            src={image?.sourceUrl ?? ''}
            alt={image?.altText ?? ''}
            fill={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            sizes="(max-width: 768px) 1500px, 400px"
            className="brightness-75 filter max-w-full hidden sm:block"
            loader={imageLoader}
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
            onLoad={() => setAnimationReady(true)}
          />
        </div>
      </div>
    )
  }
)

Slide.displayName = 'Slide'
