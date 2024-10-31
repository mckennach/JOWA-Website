import { Section, Container, cn } from '../../craft'
import { print } from 'graphql/language/printer'
import { ContentNode, Page, Service } from '@/gql/graphql'
import { ABOUT_PAGE_QUERY } from '@/lib/queries'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'

import { Filter } from '../../ui/filter'
import { Text } from '../../ui/text'
import { SERVICES_QUERY } from '@/src/lib/queries/services/service-query'
import AboutHeading from './about-heading'
import TeamMembers from './about-team'
import AboutLogo from './about-logo'
interface TemplateProps {
  node: ContentNode
}

export default async function AboutTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(ABOUT_PAGE_QUERY), {
    id: '/about',
  })

  const { services } = await fetchGraphQL<{
    services: { nodes: Array<Service> }
  }>(print(SERVICES_QUERY))

  console.log(services)

  return (
    <>
      <AboutHeading page={page} services={services.nodes} />
      <AboutLogo page={page} />
      <TeamMembers />
    </>
  )
}
