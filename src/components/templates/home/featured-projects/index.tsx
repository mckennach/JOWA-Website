'use client'

import { Container, Section } from '@/src/components/craft'
import { Project } from '@/src/gql/graphql'
import { useMediaQuery } from 'usehooks-ts'
import FeaturedProjectsDesktop from './desktop'
import FeaturedProjectsMobile from './mobile'

type FeaturedProjects = {
  projects: Project[]
  projectIds?: string[]
  noLoading?: boolean
}

export default function FeaturedProjects({ projects }: FeaturedProjects) {
  const matches = useMediaQuery('(min-width: 1024px)', {
    defaultValue: true,
  })

  return (
    <Section className="relative">
      {matches && (
        <Container className="relative overflow-hidden px-0 hidden md:block">
          <FeaturedProjectsDesktop projects={projects} />
        </Container>
      )}
      {!matches && (
        <Container className="relative overflow-hidden px-0 block md:hidden">
          <FeaturedProjectsMobile projects={projects} />
        </Container>
      )}
    </Section>
  )
}
