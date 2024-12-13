'use client'

import { Container, Section } from '@/src/components/craft'
import ShareButton from '@/src/components/ui/share'
import { Text } from '@/src/components/ui/text'
import {
  Post,
  PostData,
  PostDataPostContentBlockquoteLayout,
  PostDataPostContentFullWidthImageLayout,
  PostDataPostContentImageGalleryLayout,
  PostDataPostContentImageTextSectionLayout,
  PostDataPostContentTextSectionLayout,
} from '@/src/gql/graphql'
import { Fragment } from 'react'
import {
  Blockquote,
  FullWidthImage,
  ImageGallery,
  ImageTextSection,
  TextSection,
} from './post-content-blocks'
export default function JournalPostContent({ post }: { post: Post }) {
  const { postData } = post
  const { postContent, credits } = postData as PostData
  return (
    <Section className="space-y-32 pb-20 pt-40 lg:pb-36">
      {postContent?.map((content, index) => {
        return (
          <Fragment key={index}>
            {content?.fieldGroupName ===
              'PostDataPostContentTextSectionLayout' && (
              <TextSection
                title={
                  (content as PostDataPostContentTextSectionLayout).title ?? ''
                }
                description={
                  (content as PostDataPostContentTextSectionLayout)
                    .description ?? ''
                }
              />
            )}
            {content?.fieldGroupName ===
              'PostDataPostContentImageTextSectionLayout' && (
              <ImageTextSection
                title={
                  (content as PostDataPostContentImageTextSectionLayout)
                    .title ?? ''
                }
                description={
                  (content as PostDataPostContentImageTextSectionLayout)
                    .description ?? ''
                }
                image={
                  (content as PostDataPostContentImageTextSectionLayout).image
                }
              />
            )}
            {content?.fieldGroupName ===
              'PostDataPostContentBlockquoteLayout' && (
              <Blockquote
                text={
                  (content as PostDataPostContentBlockquoteLayout).text ?? ''
                }
              />
            )}
            {content?.fieldGroupName ===
              'PostDataPostContentFullWidthImageLayout' && (
              <FullWidthImage
                image={
                  (content as PostDataPostContentFullWidthImageLayout).image
                }
              />
            )}
            {content?.fieldGroupName ===
              'PostDataPostContentImageGalleryLayout' && (
              <ImageGallery
                images={
                  (content as PostDataPostContentImageGalleryLayout).images
                }
              />
            )}
          </Fragment>
        )
      })}
      <Container>
        <div className="mt-20 space-y-3 text-center lg:mt-0 lg:text-left">
          <Text tag="p" className="text-accent">
            {postData?.credits}
          </Text>
          <ShareButton />
        </div>
      </Container>
    </Section>
  )
}
