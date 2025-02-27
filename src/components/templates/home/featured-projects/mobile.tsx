'use client'

// import dynamic from 'next/dynamic'
import { Image } from '@/src/components/ui/image'
import { Text } from '@/src/components/ui/text'
import { Project } from '@/src/gql/graphql'
import { imageLoader, zeroPad } from '@/src/lib/utils'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'

type FeaturedProjects = {
  projects: Project[]
  projectIds?: string[]
  noLoading?: boolean
}

export default function FeaturedProjectsMobile({ projects }: FeaturedProjects) {
  const projectNodes = projects ?? []
  const router = useRouter()
  return (
    <Fragment>
      {projectNodes.map((project, index) => {
        return (
          <div className="relative not-prose max-w-full w-full" key={index}>
            <div className="image relative w-full aspect-[3/4] mx-auto">
              <Image
                src={
                  project?.projectFields?.mobileFeaturedImage?.node
                    ?.sourceUrl ?? ''
                }
                alt={
                  project?.projectFields?.mobileFeaturedImage?.node?.altText ??
                  ''
                }
                fill={true}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                sizes={
                  project?.projectFields?.mobileFeaturedImage?.node?.sizes ?? ''
                }
                className="brightness-75 filter max-w-full block"
                loader={imageLoader}
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
            <div
              className="absolute bottom-10 z-30 cursor-pointer pl-8 text-secondary"
              onClick={() => {
                router.push(`/work/${project?.slug}`)
              }}
            >
              <Text type="label" tag="p" className="lg:leading-[21.25px]">
                {zeroPad(index + 1)}/{zeroPad(projectNodes.length)}
              </Text>
              <Text type="label" tag="p" className="lg:leading-[21.25px]">
                {project?.title}
              </Text>
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}
