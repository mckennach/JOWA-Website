'use client'

import Image from 'next/image'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { Project } from '@/src/gql/graphql'

export default function WorkHero({ project }: { project: Project }) {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="relative aspect-[800/620] overflow-hidden">
        <Image
          src={project.projectFields?.heroImage?.node.mediaItemUrl ?? ''}
          alt="alt"
          layout="fill"
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
