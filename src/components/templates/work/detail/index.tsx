import { WORK_DETAIL_QUERY, WORK_QUERY } from '@/lib/queries'
import PricingCTA from '@/src/components/footer/pricing-cta'
import {
  ContentNode,
  Project,
  RootQueryToProjectConnection,
} from '@/src/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { print } from 'graphql/language/printer'
import NextPost from './next-post'
import ProjectContent from './project-content'
import ProjectHero from './project-hero'
import ProjectInfo from './project-info'
interface TemplateProps {
  node: ContentNode
}

export default async function WorkDetailTemplate({ node }: TemplateProps) {
  const { project } = await fetchGraphQL<{ project: Project }>(
    print(WORK_DETAIL_QUERY),
    {
      id: node?.uri,
    }
  ) // This is the only change in this file
  const { projects } = await fetchGraphQL<{
    projects: RootQueryToProjectConnection
  }>(print(WORK_QUERY))

  if (!project || !projects) return null

  return (
    <>
      <ProjectHero project={project} />
      <ProjectInfo project={project} />
      <ProjectContent project={project} />
      <NextPost projects={projects} currentId={project.id} />
      <PricingCTA />
    </>
  )
}
