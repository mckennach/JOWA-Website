'use client'

import { useRef, forwardRef, useState, useEffect } from 'react'
import { Project } from '@/src/gql/graphql'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

import Image from 'next/image'
import { Section, Container } from '@/components/craft'
import { imageLoader } from '@/src/lib/utils'
import { useIntersectionObserver } from 'usehooks-ts'
import { zeroPad } from '@/src/lib/utils'
import { useRouter } from 'next/navigation'
import { Text } from '@/src/components/ui/text'

gsap.registerPlugin(ScrollTrigger)


type FeaturedProjects = {
  projects: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjects) {
  const router = useRouter()
  const projectNodes = projects ?? []
  const container = useRef(null)
  const galleryRefs = useRef<Array<HTMLDivElement | null>>([])
  const [count, setCount] = useState<number>(1)
  const [caption, setCaption] = useState<string>(projectNodes[0]?.title ?? '')
  const [activeItem, setActiveItem] = useState<Project>(projectNodes[0] ?? null)
  const [isActive, setIsActive] = useState<boolean>(true)

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
              setActiveItem(projectNodes[i])
              setCaption(projectNodes[i]?.title ?? '')
              setCount(i + 1)
            },
            onEnterBack: () => {
              setActiveItem(projectNodes[i])
              setCaption(projectNodes[i]?.title ?? '')
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
    { scope: container, dependencies: [projectNodes] }
  )

  return (
    <Section className="relative">
      <Container ref={container} className="overflow-hidden">
        {projectNodes.map((project, index) => {
          const image =
            project?.projectFields?.featuredImage?.node ??
            project?.projectFields?.heroImage?.node
          return (
            <Slide
              key={index}
              index={index}
              image={{
                url: image?.sourceUrl ?? '',
                alt: image?.altText ?? '',
              }}
              ref={(el) => {
                galleryRefs.current[index] = el
              }}
            />
          )
        })}
        {isActive && (
          <div
            className="fixed bottom-10 z-30 cursor-pointer pl-8 text-secondary md:pl-16"
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
      </Container>
    </Section>
  )
}

type SlideProps = {
  image: { url?: string; alt?: string }
  index: number
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
  ({ image, index }, ref) => {
    const { ref: intersectRef } = useIntersectionObserver({
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
            loading="eager"
            className="brightness-75 filter"
            loader={imageLoader}
            priority={true}
          />
        </div>
      </div>
    )
  }
)

Slide.displayName = 'Slide'
