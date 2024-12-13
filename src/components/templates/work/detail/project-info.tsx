'use client'
import { Text } from '@/src/components/ui/text'
import { Project } from '@/src/gql/graphql'
import { Container, Section } from '../../../craft'

const ProjectInfoTable = ({ project }: { project: Project }) => {
  const { projectInfo } = project?.projectFields ?? {}
  const { category, projectType, services, location, sqFt } = projectInfo ?? {}

  return (
    <div>
      <div className="w-full max-w-[529px]">
        <div className="">
          {location && (
            <div className="flex border-b">
              <div className="flex h-5 basis-1/2 py-1 lg:h-auto">
                <Text type="label">Location</Text>
              </div>
              <div className="flex h-5 basis-1/2 py-1 lg:h-auto">
                <Text type="label">{location}</Text>
              </div>
            </div>
          )}
          {category && (
            <div className="flex border-b">
              <div className="flex h-5 basis-1/2 py-1 lg:h-auto">
                <Text type="label">Category</Text>
              </div>
              <div className="flex h-5 basis-1/2 py-1 lg:h-auto">
                <Text type="label">{category}</Text>
              </div>
            </div>
          )}
          {sqFt && (
            <div className="flex border-b">
              <div className="flex h-5 basis-1/2 py-1 lg:h-auto">
                <Text type="label">Sq Ft</Text>
              </div>
              <div className="flex h-5 basis-1/2 py-1 lg:h-auto">
                <Text type="label">{sqFt}</Text>
              </div>
            </div>
          )}
          {projectType && (
            <div className="flex border-b">
              <div className="flex h-5 basis-1/2 py-1 lg:h-auto">
                <Text type="label">Project Type</Text>
              </div>
              <div className="flex h-5 basis-1/2 py-1 lg:h-auto">
                <Text type="label">{projectType}</Text>
              </div>
            </div>
          )}
          {services && (
            <div className="flex items-baseline">
              <div className="flex basis-1/2 flex-col">
                <div className="h-[25px] border-b py-1 lg:h-auto">
                  <Text type="label">Services</Text>
                </div>
              </div>

              <div className="flex basis-1/2 flex-col">
                {services.map((service, index) => (
                  <div key={index} className="h-[25px] border-b py-1 lg:h-auto">
                    <Text type="label">{service?.service ?? ''}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectInfo({ project }: { project: Project }) {
  return (
    <Section>
      <Container className="py-16">
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          <div className="basis-1/2">
            <ProjectInfoTable project={project} />
          </div>
          <div className="basis-1/2">
            <div
              dangerouslySetInnerHTML={{
                __html: project?.projectFields?.description ?? '',
              }}
              className="body-xl-fluid lg:ml-auto lg:mr-0 lg:max-w-[665px]"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
