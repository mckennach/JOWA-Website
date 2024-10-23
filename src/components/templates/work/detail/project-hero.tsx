'use client'

import Image from 'next/image'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { Project } from '@/src/gql/graphql'

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative h-auto overflow-hidden lg:max-h-screen lg:min-h-screen">
      <div className="relative aspect-square">
        <Image
          src={project.projectFields?.heroImage?.node.mediaItemUrl ?? ''}
          alt="alt"
          fill={true}
          style={{
            objectFit: 'cover',
          }}
          className="brightness-75 filter"
          loader={imageLoader}
          priority={true}
        />
      </div>
      <div className="absolute bottom-5 left-16 w-full text-background">
        <h1 className="text-[48px] uppercase text-background">
          {project.title}
        </h1>
      </div>
    </section>
  )
}
