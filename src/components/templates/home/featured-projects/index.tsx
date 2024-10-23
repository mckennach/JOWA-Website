'use client'

import { useRef, forwardRef, useState } from 'react'
import {
  Project,
} from '@/src/gql/graphql'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { Section, Container } from '@/components/craft'
import { imageLoader } from '@/src/lib/utils'
import { useIntersectionObserver } from 'usehooks-ts'
import { zeroPad } from '@/src/lib/utils'
import gql from 'graphql-tag'
import { useRouter } from 'next/navigation'
type FeaturedProjects = {
  projects: Project[];
}

const FEATURED_PROJECTS_QUERY = gql`
  query FeaturedProjects($ids: [ID]) {
    projects(where: { in: $ids }) {
      nodes {
        title
        slug
        uri
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
        projectFields {
          heroImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`

export default function FeaturedProjects({ projects }: FeaturedProjects) {
  const router = useRouter()
  const projectNodes = projects ?? []
  const container = useRef(null)
  const galleryRefs = useRef<Array<HTMLDivElement | null>>([])
  const [count, setCount] = useState<number>(1)
  const [caption, setCaption] = useState<string>(projectNodes[0]?.title ?? '')
  const [activeItem, setActiveItem] = useState<Project>(projectNodes[0] ?? null)
  const [isActive, setIsActive] = useState<boolean>(true)

  useGSAP(
    () => {
      const panels = galleryRefs.current
      console.log('panels', panels)
      if (panels.length === 0 || !container.current) return
      console.log('panels', panels)
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
            project?.featuredImage?.node ??
            project?.projectFields?.heroImage?.node
          return (
            <Slide
              key={index}
              index={index}
              image={{
                url: image?.mediaItemUrl ?? '',
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
            <p>
              {zeroPad(count)}/{zeroPad(projectNodes.length)}
            </p>
            <p className="uppercase">{activeItem?.title}</p>
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
