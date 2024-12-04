'use client'

import { Project, ProjectFields } from '@/src/gql/graphql'
import { Section, Container } from '@/src/components/craft'
import { Fragment } from 'react'
import {
  FullWidthImage,
  ImageGallery,
  TextImageSection,
} from './project-content-blocks'

export default function ProjectContentBlocks({
  project,
}: {
  project: Project
}) {
  const { projectFields } = project
  const { content } = projectFields as ProjectFields
  return (
    <Section className="space-y-32 pb-20 pt-10 lg:pb-36">
      {content?.map((block, index) => {
        return (
          <Fragment key={index}>
            {block?.fieldGroupName ===
              'ProjectFieldsContentFullWidthImageLayout' && (
              <FullWidthImage {...block} />
            )}
            {block?.fieldGroupName ===
              'ProjectFieldsContentImageGalleryLayout' && (
              <ImageGallery {...block} />
            )}
            {block?.fieldGroupName ===
              'ProjectFieldsContentTextImageSectionLayout' && (
              <TextImageSection {...block} />
            )}
          </Fragment>
        )
      })}
    </Section>
  )
}
