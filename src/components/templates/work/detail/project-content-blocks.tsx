'use client'

import Image from 'next/image'
import { imageLoader } from '@/src/lib/utils'
import {
  Project,
  ProjectFields,
  ProjectFieldsContentFullWidthImageLayout,
  ProjectFieldsContentTextImageSectionLayout,
  ProjectFieldsContentImageGalleryLayout,
} from '@/src/gql/graphql'
import { Section, Container } from '@/src/components/craft'
import { Fragment } from 'react'
import { Text } from '@/src/components/ui/text'

export function ImageGallery({
  images,
}: ProjectFieldsContentImageGalleryLayout) {
  
  return (
    <Section className="">
      <Container className="grid gap-8 lg:grid-cols-2">
        {images && images[0] && (
          <div>
            <div className="relative aspect-[662/868] max-w-[662px]">
              <Image
                src={images[0].image?.node.sourceUrl ?? ''}
                alt={images[0].image?.node.altText ?? ''}
                fill={true}
                style={{
                  objectFit: 'cover',
                }}
                sizes="662px"
                className="brightness-75 filter"
                loader={imageLoader}
                priority={true}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col justify-between">
          {images && images[1] && (
            <div className="block">
              <div className="relative ml-auto mr-0 aspect-[660/454] h-full lg:max-w-[80%]">
                <Image
                  src={images[1].image?.node.sourceUrl ?? ''}
                  alt={images[1].image?.node.altText ?? ''}
                  fill={true}
                  style={{
                    objectFit: 'cover',
                  }}
                  sizes="660px"
                  className="brightness-75 filter"
                  loader={imageLoader}
                  priority={true}
                />
              </div>
            </div>
          )}
          <div className="mr-0 mt-11 flex h-[45%] max-w-[475px] flex-col justify-end gap-9 text-accent-foreground lg:ml-auto lg:mt-0">
            {images?.map((image, index) => (
              <div key={index}>
                <Text type="body-xs" tag="p">
                  fig. {index + 1}
                </Text>
                <Text type="body-xs" tag="p">
                  {image?.caption}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export function FullWidthImage({
  image,
}: ProjectFieldsContentFullWidthImageLayout) {
  return (
    <Section>
      <Container className="">
        <div className="relative aspect-[1527/855]">
          <Image
            src={image?.node.sourceUrl ?? ''}
            alt={image?.node.altText ?? ''}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            sizes="1527px"
            className="brightness-75 filter"
            loader={imageLoader}
            priority={true}
          />
        </div>
      </Container>
    </Section>
  )
}

export function TextImageSection({
  content,
  image,
}: ProjectFieldsContentTextImageSectionLayout) {
  return (
    <Section className="">
      <Container className="grid gap-8 lg:grid-cols-2">
        <div>
          <div
            className="body-xl-fluid"
            dangerouslySetInnerHTML={{ __html: content ?? '' }}
          />
        </div>
        <div className="pt-32">
          <div className="relative ml-auto mr-0 aspect-[295/351] max-w-[295px]">
            <Image
              src={image?.node.sourceUrl ?? ''}
              alt={image?.node.altText ?? ''}
              fill={true}
              style={{
                objectFit: 'cover',
              }}
              sizes="662px"
              className="brightness-75 filter"
              loader={imageLoader}
              priority={true}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
