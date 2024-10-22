import { print } from 'graphql/language/printer'
import { ContentNode, Project } from '@/src/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { WORK_DETAIL_QUERY } from '@/lib/queries'
import WorkHero from './work-hero'
import { Container, Section } from '../../craft'

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

  return (
    <>
      <WorkHero project={project} />
      <Section>
        <Container className="py-16">
          <div className="flex justify-between">
            <div className="basis-1/2"></div>
            <div className="basis-1/2">
              <div
                dangerouslySetInnerHTML={{
                  __html: project?.projectFields?.description ?? '',
                }}
                className="leading-12 text-[32px]"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
