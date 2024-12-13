import { ContentNode, Global, Page, TeamMemberConnection } from '@/gql/graphql'
import { ABOUT_PAGE_QUERY, GLOBALS_QUERY } from '@/lib/queries'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { TEAM_MEMBERS_QUERY } from '@/src/lib/queries/pages/team-query'
import { print } from 'graphql/language/printer'
import AboutHeading from './about-heading'
import AboutLogo from './about-logo'
import TeamMembers from './about-team'
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

	const { teamMembers } = await fetchGraphQL<{
    teamMembers: TeamMemberConnection
  }>(print(TEAM_MEMBERS_QUERY), {
    id: '357',
  });


  if (!page) return null
  return (
    <>
      <AboutHeading page={page} globalData={global} />
      <OurProcess page={page} />
      <AboutLogo page={page} />
      <TeamMembers members={teamMembers.nodes} />
    </>
  )
}
