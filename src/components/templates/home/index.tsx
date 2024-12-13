import {
	Page,
	PostFormatToProjectConnection
} from '@/gql/graphql';
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL';
import { FEATURED_PROJECTS_QUERY, MOBILE_FEATURED_PROJECTS_QUERY } from '@/src/lib/queries/work/featured-projects-query';
import { print } from 'graphql/language/printer';
import { cookies } from 'next/headers';
import { lazy } from 'react';
import { TemplateProps } from '../page';
// import FeaturedProjects from './featured-projects'
// import HomeAbout from './home-about'
import { HOME_PAGE_QUERY } from './home-query';
import Loading from './loading';


const HomeAbout = lazy(() => import('./home-about'));
const FeaturedProjects = lazy(() => import('./featured-projects'));

export default async function HomePage({ node }: TemplateProps) {
  const cookieStore = await cookies()
  const loaded = cookieStore.get('animation-loaded')
	
  const { page } = await fetchGraphQL<{ page: Page }>(print(HOME_PAGE_QUERY), {
    id: node.databaseId,
  })

  const { featuredProjects, homeContent } = page.home ?? {}
  const projectIds = featuredProjects?.nodes.map((project) => project.id)

  const { projects } = await fetchGraphQL<{
    projects: PostFormatToProjectConnection
  }>(print(FEATURED_PROJECTS_QUERY), {
    ids: projectIds,
  });

	const { projects: mobileProjects } = await fetchGraphQL<{
    projects: PostFormatToProjectConnection
  }>(print(MOBILE_FEATURED_PROJECTS_QUERY), {
    ids: projectIds,
  })
	
	if(!projects || !featuredProjects) return null;


	
  return (
    <>
      {loaded === undefined && <Loading project={projects?.nodes[0]} />}
      {featuredProjects?.nodes && featuredProjects?.nodes.length > 0 && (
        <FeaturedProjects
          projects={projects?.nodes}
					mobileProjects={mobileProjects?.nodes}
          noLoading={loaded !== undefined}
        />
      )}
      {homeContent && (
        <HomeAbout data={homeContent} noLoading={loaded !== undefined} />
      )}
    </>
  )
}
