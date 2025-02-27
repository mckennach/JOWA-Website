'use client'

import { Text } from '@/src/components/ui/text'
import { Project } from '@/src/gql/graphql'
import { imageLoader } from '@/src/lib/utils'
import Image from 'next/image'
export default function ProjectHero({ project }: { project: Project }) {
  return (
    <header className="relative h-auto overflow-hidden max-h-dvh">
      <div className="relative aspect-[3/4] lg:aspect-[16/9]">
        <Image
          src={project.projectFields?.heroImage?.node.sourceUrl ?? ''}
          alt="alt"
          fill={true}
          style={{
            objectFit: 'cover',
          }}
          sizes="100vw"
          className="brightness-75 filter"
          loader={imageLoader}
          priority={true}
        />
      </div>
      <div className="absolute bottom-5 left-4 w-full text-cream lg:left-12">
        <Text tag="h1" type="title1" className="text-cream">
          {project.title}
        </Text>
      </div>
    </header>
  )
}
