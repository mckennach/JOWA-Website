'use client'

import Image from 'next/image'
import { Container, Section } from '@/src/components/craft'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { Post, PostData, Tag } from '@/src/gql/graphql'
import { Text } from '@/src/components/ui/text'
import CustomIcons from '@/src/components/custom-icons'
import Link from 'next/link'
export default function JournalContent({ post }: { post: Post }) {
  const { postData } = post
  const { content } = postData as PostData
  return (
    <div className="space-y-32 pb-20 lg:pb-36">
      <Section>
        <Container className="flex flex-col gap-y-24">
          <div className="space-y-6 pt-40 lg:mx-auto lg:max-w-[80%]">
            {content?.section1Title && (
              <Text
                type="heading"
                tag="h2"
                className="font-maisonNeue text-[24px] leading-[32px] tracking-wide text-accent-foreground lg:text-[32px] lg:leading-[42px]"
              >
                1. {content?.section1Title}
              </Text>
            )}

            {content?.section1Copy && (
              <div
                dangerouslySetInnerHTML={{ __html: content.section1Copy }}
                className="space-y-8 font-maisonNeue text-[24px] leading-[32px] tracking-wide lg:text-[32px] lg:leading-[42px]"
              />
            )}
          </div>
          {content?.section1Cta &&
            content?.section1Cta?.image &&
            content?.section1Cta?.copy && (
              <div className="gap-28 space-y-12 lg:flex">
                <div className="lg:basis-1/2">
                  <div className="relative mx-auto aspect-[662/868] max-w-[662px]">
                    <Image
                      src={content?.section1Cta?.image?.node.mediaItemUrl ?? ''}
                      alt={content?.section1Cta?.image?.node.altText ?? ''}
                      fill={true}
                      style={{
                        objectFit: 'cover',
                      }}
                      className="brightness-75 filter"
                      loader={imageLoader}
                      priority={true}
                    />
                  </div>
                </div>
                <div className="lg:basis-1/2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content?.section1Cta?.copy ?? '',
                    }}
                    className="space-y-8 font-maisonNeue text-[24px] leading-[32px] tracking-wide lg:text-[32px] lg:leading-[42px]"
                  />
                </div>
              </div>
            )}
        </Container>
      </Section>
      {content?.blockQuote && (
        <Section>
          <Container>
            <div className="mx-auto max-w-[1262px] text-center">
              <blockquote className="text-[20px] leading-[26.56px] text-accent lg:text-[48px] lg:leading-[63px]">
                <q>{content.blockQuote}</q>
              </blockquote>
            </div>
          </Container>
        </Section>
      )}
      {content?.fullWidthImage?.node &&
        content?.fullWidthImage.node.mediaItemUrl && (
          <Section>
            <Container className="">
              <div className="relative aspect-[1527/855]">
                <Image
                  src={content?.fullWidthImage.node.mediaItemUrl ?? ''}
                  alt={content?.fullWidthImage.node.altText ?? ''}
                  fill={true}
                  style={{
                    objectFit: 'cover',
                  }}
                  className="brightness-75 filter"
                  loader={imageLoader}
                  priority={true}
                />
              </div>
            </Container>
          </Section>
        )}
      <Section>
        <Container className="flex flex-col gap-y-24">
          <div className="space-y-6 lg:mx-auto lg:max-w-[80%]">
            {content?.section2Title && (
              <Text
                type="heading"
                tag="h2"
                className="font-maisonNeue text-[24px] leading-[32px] tracking-wide text-accent-foreground lg:text-[32px] lg:leading-[42px]"
              >
                2. {content?.section2Title}
              </Text>
            )}

            {content?.section2Copy && (
              <div
                dangerouslySetInnerHTML={{ __html: content.section2Copy }}
                className="space-y-8 font-maisonNeue text-[24px] leading-[32px] tracking-wide lg:text-[32px] lg:leading-[42px]"
              />
            )}
          </div>
          {content?.section2Cta &&
            content?.section2Cta?.image &&
            content?.section2Cta?.copy && (
              <div className="flex gap-28">
                <div className="basis-1/2">
                  <div className="relative mx-auto aspect-[662/868] max-w-[662px]">
                    <Image
                      src={content?.section2Cta?.image?.node.mediaItemUrl ?? ''}
                      alt={content?.section2Cta?.image?.node.altText ?? ''}
                      fill={true}
                      style={{
                        objectFit: 'cover',
                      }}
                      className="brightness-75 filter"
                      loader={imageLoader}
                      priority={true}
                    />
                  </div>
                </div>
                <div className="basis-1/2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content?.section2Cta?.copy ?? '',
                    }}
                    className="space-y-8 font-maisonNeue text-[24px] leading-[32px] tracking-wide lg:text-[32px] lg:leading-[42px]"
                  />
                </div>
              </div>
            )}
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2">
            <div>
              {postData?.imageGallery?.image1?.node && (
                <div className="relative mx-auto mb-24 aspect-[662/868] max-w-[662px] lg:mb-0 lg:ml-0">
                  <Image
                    src={
                      postData?.imageGallery?.image1?.node.mediaItemUrl ?? ''
                    }
                    alt={postData?.imageGallery?.image1?.node.altText ?? ''}
                    fill={true}
                    style={{
                      objectFit: 'cover',
                    }}
                    className="brightness-75 filter"
                    loader={imageLoader}
                    priority={true}
                  />
                </div>
              )}
            </div>
            <div>
              {postData?.imageGallery?.image2?.node && (
                <div className="relative mb-16 ml-auto mr-auto aspect-[660/454] max-w-[75%] lg:mb-52 lg:mr-0 lg:max-w-[660px]">
                  <Image
                    src={
                      postData?.imageGallery?.image2?.node.mediaItemUrl ?? ''
                    }
                    alt={postData?.imageGallery?.image2?.node.altText ?? ''}
                    fill={true}
                    style={{
                      objectFit: 'cover',
                    }}
                    className="brightness-75 filter"
                    loader={imageLoader}
                    priority={true}
                  />
                </div>
              )}
              {postData?.imageGallery?.image3?.node && (
                <div className="relative ml-auto mr-auto aspect-[295/351] max-w-[295px] lg:mr-0">
                  <Image
                    src={
                      postData?.imageGallery?.image3?.node.mediaItemUrl ?? ''
                    }
                    alt={postData?.imageGallery?.image3?.node.altText ?? ''}
                    fill={true}
                    style={{
                      objectFit: 'cover',
                    }}
                    className="brightness-75 filter"
                    loader={imageLoader}
                    priority={true}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-20 space-y-3 text-center lg:mt-0 lg:text-left">
            <Text tag="p" className="text-accent">
              {postData?.credits}
            </Text>
            <Link
              href="/share"
              className="flex items-center justify-center gap-1 tracking-wider lg:justify-start"
            >
              SHARE <CustomIcons name="link" />
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
