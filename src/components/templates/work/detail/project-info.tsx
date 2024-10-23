'use client'

import Image from 'next/image'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { Project } from '@/src/gql/graphql'
import { Container, Section } from '../../../craft'
import { Text } from '@/src/components/ui/text'

const ProjectInfoTable = ({ project }: { project: Project }) => {
  const { projectInfo } = project?.projectFields ?? {}
  const { location, sqFt } = projectInfo ?? {}
  const { categories } = project
  const category =
    categories &&
    categories.nodes.filter(
      (category) => category.parentId === 'dGVybToxMzcw'
    )[0]?.name
  const projectType =
    categories &&
    categories.nodes.filter(
      (category) => category.parentId === 'dGVybToxMzc5'
    )[0]?.name
  const projectServices =
    categories &&
    categories.nodes.filter((category) => category.parentId === 'dGVybToxMzc1')
  return (
    <div>
      <table className="w-full max-w-[529px]">
        <tbody>
          {location && (
            <tr>
              <td className="flex border-b">
                <Text type="label">Location</Text>
              </td>
              <td className="border-b">
                <Text type="label">{location}</Text>
              </td>
            </tr>
          )}
          {category && (
            <tr>
              <td className="flex border-b">
                <Text type="label">Category</Text>
              </td>
              <td className="border-b">
                <Text type="label">{category}</Text>
              </td>
            </tr>
          )}
          {sqFt && (
            <tr>
              <td className="flex border-b">
                <Text type="label">Sq Ft</Text>
              </td>
              <td className="border-b">
                <Text type="label">{sqFt}</Text>
              </td>
            </tr>
          )}
          {projectType && (
            <tr>
              <td className="flex border-b">
                <Text type="label">Project Type</Text>
              </td>
              <td className="border-b">
                <Text type="label">{projectType}</Text>
              </td>
            </tr>
          )}
          {projectServices && (
            <tr>
              <td className="flex">
                <Text type="label">Services</Text>
              </td>
              <td>
                {projectServices.map((service) => (
                  <div key={service.id} className="border-b">
                    <Text type="label">{service.name}</Text>
                  </div>
                ))}
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
              className="space-y-4 text-body lg:ml-auto lg:mr-0 lg:max-w-screen-sm"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
