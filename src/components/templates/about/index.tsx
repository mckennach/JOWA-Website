import { Section, Container, cn } from '../../craft'
import { print } from 'graphql/language/printer'
import { ContentNode, Page, Global } from '@/gql/graphql'
import { ABOUT_PAGE_QUERY, GLOBALS_QUERY } from '@/lib/queries'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import AboutHeading from './about-heading'
import TeamMembers from './about-team'
import AboutLogo from './about-logo'
import OurProcess from './our-process'
interface TemplateProps {
  node: ContentNode
}

export default async function AboutTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(ABOUT_PAGE_QUERY), {
    id: '/about',
  })

  const { global } = await fetchGraphQL<{
    global: Global
  }>(print(GLOBALS_QUERY), {
    id: '357',
  })

  return (
    <>
      <AboutHeading page={page} globalData={global} />
      <OurProcess page={page} />
      <AboutLogo page={page} />
      <TeamMembers />
    </>
  )
}
