'use client'

import { Container, Section } from '@/components/craft'
import { Text } from '@/src/components/ui/text'
import { MediaItem, Project } from '@/src/gql/graphql'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { useGSAP } from '@gsap/react'
// import _ScrollTrigger from 'gsap/ScrollTrigger'
import { gsap } from 'gsap/all'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { forwardRef, useRef, useState } from 'react'
import { useIntersectionObserver, useMediaQuery } from 'usehooks-ts'
import useLoading from '../loading/useLoading'

type FeaturedProjects = {
  projects: Project[]
	mobileProjects: Project[];
  noLoading?: boolean
}

export default function FeaturedProjects({
  projects,
	mobileProjects,
  noLoading,
}: FeaturedProjects) {
	const matches = useMediaQuery('(min-width: 768px)')
	const [animationReady, setAnimationReady] = useState(false)
  const router = useRouter()
  const projectNodes = projects ?? []
  const container = useRef(null)
  const galleryRefs = useRef<Array<HTMLDivElement | null>>([])
  const [count, setCount] = useState<number>(1)
  const [caption, setCaption] = useState<string>(projectNodes[0]?.title ?? '')
  const [activeItem, setActiveItem] = useState<Project>(projectNodes[0] ?? null)
  const [isActive, setIsActive] = useState<boolean>(true)
  const { hasLoaded } = useLoading()


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
    {
      scope: container,
      dependencies: [projectNodes, animationReady],
      revertOnUpdate: true,
    }
  )

  return (
    <Section className="relative">
      <Container ref={container} className="overflow-hidden">
        {projectNodes.map((project, index) => {
					const image = project?.projectFields?.featuredImage?.node ?? project?.projectFields?.heroImage?.node;
					const mobileImage = mobileProjects[index]?.projectFields?.featuredImage?.node ?? mobileProjects[index]?.projectFields?.heroImage?.node;
					// if (!matches) {
					// 	image = mobileProjects[index]?.projectFields?.featuredImage?.node ?? mobileProjects[index]?.projectFields?.heroImage?.node
					// }

          return (
            <Slide
              key={index}
              index={index}
							setAnimationReady={setAnimationReady}
							image={image}
							mobileImage={mobileImage}
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
  image?: MediaItem;
	mobileImage?: MediaItem;
	setAnimationReady: (value: boolean) => void
  index: number
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
  ({ image, mobileImage, setAnimationReady, index }, ref) => {

		const {
			sourceUrl: url,
			altText: alt,
			sizes,
		} = image ?? {};

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
          className="image relative max-w-full"
          style={{
            height: 'calc(100vh - 80px)',
          }}
          ref={intersectRef}
        >
					<picture>
						<source media="(max-width:768px)" srcSet={image?.srcSet ?? ''} type={image?.mediaDetails?.sizes?.mimeType} /> 
						<source media="(max-width:640px)" srcSet={mobileImage?.srcSet ?? ''} type={image?.mediaDetails?.sizes?.mimeType} />
						<Image
							src={url ?? ''}
							alt={alt ?? ''}
							fill={true}
							style={{
								objectFit: 'cover',
								objectPosition: 'center',
							}}
							sizes={sizes ?? ''}
							className="brightness-75 filter"
							loader={imageLoader}
							priority={index === 0}
							quality={100}
							loading={index === 0 ? 'eager' : 'lazy'}
							onLoad={() => setAnimationReady(true)}
						/>
					</picture>
          {/* <Image
            src={image?.url ?? ''}
            alt={image.alt ?? ''}
            fill={true}
            style={{
              objectFit: 'cover',
							objectPosition: 'center',
            }}
						sizes={image?.sizes ?? ''}
            className="brightness-75 filter"
            loader={imageLoader}
            priority={index === 0} 
						loading={index === 0 ? 'eager' : 'lazy'}
						onLoad={() => setAnimationReady(true)}
          /> */}
        </div>
      </div>
    )
  }
)

Slide.displayName = 'Slide'
